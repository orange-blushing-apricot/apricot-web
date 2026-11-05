import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./session";

export async function requireSession() {
  if (!verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) {
    redirect("/login");
  }
}
