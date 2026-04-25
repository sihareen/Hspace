"use client";

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

type ExperienceCardItem = {
  period: string;
  title: string;
  company: string | null;
  description: string;
  tags: string[];
  category: string;
};

type ExperienceGalleryProps = {
  items: ExperienceCardItem[];
};

export function ExperienceGallery({ items }: ExperienceGalleryProps) {
  const [activeItem, setActiveItem] = useState<ExperienceCardItem | null>(null);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeItem]);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={`${item.period}-${item.title}`}
            role="button"
            tabIndex={0}
            onClick={() => setActiveItem(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActiveItem(item);
              }
            }}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{item.period}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
            {item.company ? <p className="mt-1 text-sm text-slate-300">{item.company}</p> : null}
            <p className="truncate-3 mt-3 text-sm leading-7 text-white/70">{item.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={`${item.title}-${tag}`}
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/65"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/45">{item.category}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-cyan-300/85">View details</p>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm sm:px-6">
          <button type="button" className="absolute inset-0" aria-label="Close popup" onClick={() => setActiveItem(null)} />

          <article className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#090b0f] p-7 shadow-[0_35px_90px_rgba(0,0,0,0.8)] sm:p-8">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 transition hover:border-cyan-300/50 hover:text-cyan-300"
              aria-label="Close details"
            >
              <FiX />
            </button>

            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{activeItem.period}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{activeItem.title}</h3>
            {activeItem.company ? <p className="mt-2 text-sm text-slate-300">{activeItem.company}</p> : null}
            <p className="mt-4 text-sm leading-8 text-white/75">{activeItem.description}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {activeItem.tags.map((tag) => (
                <li
                  key={`${activeItem.title}-popup-${tag}`}
                  className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/65"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/45">{activeItem.category}</p>
          </article>
        </div>
      ) : null}
    </>
  );
}
