import "server-only";

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/*
 * DATABASE_URL set   -> that postgres (orzzn, neon, supabase, any standard postgres url)
 * DATABASE_URL unset -> in dev, the embedded postgres started by `npm run dev` (scripts/dev.mjs)
 */

function url() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.LOCAL_DATABASE_URL) return process.env.LOCAL_DATABASE_URL;
  throw new Error(
    process.env.NODE_ENV === "production"
      ? "DATABASE_URL is not set"
      : "No database: start the app with `npm run dev` (it boots a local one) or set DATABASE_URL",
  );
}

export type Db = PostgresJsDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { db?: Db };

function connect(): Db {
  globalForDb.db ??= drizzle(postgres(url(), { prepare: false, max: 5 }), { schema });
  return globalForDb.db;
}

// connects on first query, not on import, so builds work without a database
export const db = new Proxy({} as Db, {
  get: (_, key) => Reflect.get(connect(), key),
});
