import { cookies } from "next/headers";
import { logout } from "@/app/login/actions";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export async function LogoutButton() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) return null;

  return (
    <form action={logout}>
      <button className="hover:underline">Log out</button>
    </form>
  );
}
