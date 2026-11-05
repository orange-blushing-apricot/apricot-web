"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkCredentials,
  createSessionToken,
  SESSION_COOKIE,
  safeRedirectPath,
} from "@/lib/session";

export type LoginState = { error: string | null };

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(username, password)) {
    return { error: "Invalid username or password" };
  }
  (await cookies()).set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(safeRedirectPath(String(formData.get("next") ?? "")));
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
