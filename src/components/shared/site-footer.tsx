export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="container-page">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 t-small text-ink-3">
        <p>© {year} Muhammad Rizkan Harin Faza</p>
        <a href="#hero" className="inline-flex min-h-11 items-center hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  );
}
