const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-cyan-300/10 bg-[#0b0f19]/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 sm:px-10 md:flex-row md:items-center md:justify-between">
        <a
          href="#hero"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-sm uppercase tracking-[0.25em] text-cyan-100"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
          Rizkan Harin
        </a>
        <nav aria-label="Primary" className="-mx-2 overflow-x-auto px-2">
          <ul className="flex min-w-max items-center gap-2 md:gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full border border-cyan-300/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-slate-300 transition hover:border-cyan-300/45 hover:text-cyan-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
