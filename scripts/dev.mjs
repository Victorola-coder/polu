// `npm run dev`: starts next. when DATABASE_URL isn't set, first boots an embedded
// postgres (pglite) on a free local port so every next worker shares one database,
// and hands next its address via LOCAL_DATABASE_URL.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { createServer } from "node:net";

try {
  if (existsSync(".env.local")) process.loadEnvFile(".env.local");
} catch {}

// ask the os for an unused port
const freePort = () =>
  new Promise((resolve, reject) => {
    const probe = createServer()
      .once("error", reject)
      .listen(0, "127.0.0.1", () => {
        const { port } = probe.address();
        probe.close(() => resolve(port));
      });
  });

async function startLocalDb() {
  const port = await freePort();

  const { PGlite } = await import("@electric-sql/pglite");
  const { PGLiteSocketServer } = await import("@electric-sql/pglite-socket");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");

  mkdirSync(".data", { recursive: true });
  const pg = await PGlite.create("./.data/pglite");
  await migrate(drizzle(pg), { migrationsFolder: "./drizzle" });

  const server = new PGLiteSocketServer({ db: pg, port, maxConnections: 20 });
  await server.start();
  console.log(`[db] local database ready on :${port} (data in .data/)`);

  const stop = async () => {
    await server.stop().catch(() => {});
    await pg.close().catch(() => {});
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  return `postgres://postgres:postgres@127.0.0.1:${port}/postgres`;
}

const env = { ...process.env };
if (!env.DATABASE_URL) env.LOCAL_DATABASE_URL = await startLocalDb();

const next = spawn("next", ["dev", ...process.argv.slice(2)], { stdio: "inherit", shell: true, env });
next.on("exit", (code) => process.exit(code ?? 0));
