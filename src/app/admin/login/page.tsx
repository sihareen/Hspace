import { redirect } from "next/navigation";

import { loginAdminAction } from "@/app/admin/actions";
import { getAdminSessionFromCookies } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSessionFromCookies();
  if (session) {
    redirect("/admin/projects");
  }

  const params = await searchParams;
  const showError = params.error === "invalid_credentials" || params.error === "invalid_input";

  return (
    <main className="mx-auto flex min-h-[75vh] w-full max-w-md items-center px-6 py-16">
      <div className="w-full rounded-2xl border border-cyan-300/20 bg-slate-900/75 p-6">
        <h1 className="font-[family-name:var(--font-heading)] text-2xl text-slate-100">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">Use your admin credential to manage projects.</p>

        {showError ? (
          <p className="mt-4 rounded-md border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            Login failed. Please check email and password.
          </p>
        ) : null}

        <form action={loginAdminAction} className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm text-slate-200">
            Email
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
            />
          </label>

          <label className="block space-y-2 text-sm text-slate-200">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full rounded-lg border border-cyan-300/20 bg-slate-950 px-3 py-2 text-slate-100 outline-none ring-cyan-300/40 focus:ring"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100 hover:bg-cyan-300/20"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
