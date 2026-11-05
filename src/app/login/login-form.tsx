"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, { error: null });

  return (
    <form action={action} className="mx-auto mt-12 max-w-sm space-y-4 rounded-lg border p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input type="hidden" name="next" value={next} />
      <label className="block space-y-1 text-sm">
        <span>Username</span>
        <input name="username" required autoComplete="username" className="w-full rounded border px-3 py-2" />
      </label>
      <label className="block space-y-1 text-sm">
        <span>Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded border px-3 py-2"
        />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full rounded bg-orange-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
