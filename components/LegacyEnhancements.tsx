"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type LightboxImage = { src: string; alt: string };
type LightboxState = { images: LightboxImage[]; index: number };

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i;

export function LegacyEnhancements() {
  const pathname = usePathname();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    setLightbox(null);
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".legacy-page [role='tablist']").forEach((tablist) => {
      const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>("[role='tab'][aria-controls]"));
      if (!tabs.length) return;

      const activate = (selected: HTMLButtonElement) => {
        tabs.forEach((tab) => {
          const active = tab === selected;
          tab.setAttribute("aria-selected", String(active));
          tab.classList.toggle("text-white", active);
          tab.classList.toggle("text-slate-700", !active);
          const panelId = tab.getAttribute("aria-controls");
          if (panelId) document.getElementById(panelId)?.classList.toggle("hidden", !active);
        });

        const indicator = tablist.querySelector<HTMLElement>("[id$='Indicator']");
        if (indicator) {
          indicator.style.width = `${selected.offsetWidth}px`;
          indicator.style.transform = `translateX(${selected.offsetLeft}px)`;
        }
      };

      const listeners = tabs.map((tab) => {
        const listener = () => activate(tab);
        tab.addEventListener("click", listener);
        return () => tab.removeEventListener("click", listener);
      });
      activate(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);
      cleanups.push(...listeners);
    });

    document.querySelectorAll<HTMLElement>(".legacy-page [class*='grid-cols-']").forEach((grid) => {
      const galleryLinks = Array.from(grid.querySelectorAll<HTMLAnchorElement>(':scope > a[target="_blank"]')).filter(
        (anchor) => anchor.querySelector("img") && IMAGE_EXTENSION.test(anchor.getAttribute("href") || "")
      );
      if (galleryLinks.length < 2) return;

      const images = galleryLinks.map((anchor) => {
        const img = anchor.querySelector("img")!;
        return { src: anchor.getAttribute("href") || img.src, alt: img.getAttribute("alt") || "Photo" };
      });

      galleryLinks.forEach((anchor, index) => {
        const listener = (event: MouseEvent) => {
          event.preventDefault();
          setLightbox({ images, index });
        };
        anchor.addEventListener("click", listener);
        cleanups.push(() => anchor.removeEventListener("click", listener));
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta: number) =>
      setLightbox((current) =>
        current ? { ...current, index: (current.index + delta + current.images.length) % current.images.length } : current
      ),
    []
  );

  useEffect(() => {
    if (!lightbox) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, close, step]);

  if (!lightbox) return null;

  const current = lightbox.images[lightbox.index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={close}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 grid w-10 h-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        ✕
      </button>

      {lightbox.images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 sm:left-6 grid w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-xl"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-2 sm:right-6 grid w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-xl"
          >
            ›
          </button>
        </>
      ) : null}

      <figure className="max-w-full max-h-full flex flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
        />
        <figcaption className="text-xs sm:text-sm font-bold text-white/80">
          {current.alt}
          {lightbox.images.length > 1 ? ` · ${lightbox.index + 1} / ${lightbox.images.length}` : ""}
        </figcaption>
      </figure>
    </div>
  );
}
