const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <a
          href="#hero"
          className="font-[family-name:var(--font-heading)] text-xs uppercase tracking-[0.35em] text-white"
        >
          Portfolio
        </a>
        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-4 lg:gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.2em] transition ${
                    item.label === "Home" ? "text-cyan-300" : "text-white/75 hover:text-cyan-300"
                  }`}
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
