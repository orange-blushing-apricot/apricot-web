import { Suspense } from "react";
import { safeRedirectPath } from "@/lib/session";
import { LoginForm } from "./login-form";

async function LoginWithRedirect({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const { next } = await searchParams;
  return <LoginForm next={safeRedirectPath(typeof next === "string" ? next : undefined)} />;
}

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <Suspense fallback={null}>
      <LoginWithRedirect searchParams={searchParams} />
    </Suspense>
  );
}
