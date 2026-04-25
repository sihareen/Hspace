import type { ReactNode } from "react";

import { logoutAdminAction } from "@/app/admin/actions";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-cyan-300/15 bg-slate-900/70 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Admin Panel</p>
          <p className="text-sm text-slate-300">Signed in as {session.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/admin/projects"
            className="rounded-md border border-cyan-300/20 px-3 py-2 text-xs uppercase tracking-[0.14em] text-slate-200"
          >
            Projects
          </a>
          <a
            href="/admin/experiences"
            className="rounded-md border border-cyan-300/20 px-3 py-2 text-xs uppercase tracking-[0.14em] text-slate-200"
          >
            Experience
          </a>
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="rounded-md border border-cyan-300/50 bg-cyan-300/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-cyan-100"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      {children}
    </div>
  );
}
