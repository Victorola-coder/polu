import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "./auth";

export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

// for pages that need a signed-in user; bounces to login otherwise
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
