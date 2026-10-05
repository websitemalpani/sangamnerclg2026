"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Images, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import styles from "./photo-gallery.module.css";

const photos = [
  ...[...Array.from({ length: 31 }, (_, index) => index + 1), ...Array.from({ length: 18 }, (_, index) => index + 34)]
    .map(number => `/media/images/gallery/gallery${number}.jpg`),
  ...[10, 15, 16, 17, 18, 27, 37, 45, 55, 65, 75, 84, 92, 111, 121, 131, 141, 151].map(number => `/media/images/pcs-facilties/${number}.jpg`),
];

export function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const previous = useCallback(() => setActive(current => current === null ? null : (current - 1 + photos.length) % photos.length), []);
  const next = useCallback(() => setActive(current => current === null ? null : (current + 1) % photos.length), []);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, next, previous]);

  return <main className={styles.page}>
    <section className={styles.hero}>
      <Image src={photos[0]} alt="Sangamner College campus" fill priority sizes="100vw" />
      <div className={styles.heroShade} />
      <div className={`container ${styles.heroContent}`}>
        <span><Images /> Campus gallery</span>
        <h1>Life at Sangamner College</h1>
        <p>A visual journey through our learning spaces, campus facilities and shared college moments.</p>
      </div>
    </section>

    <section className={`container ${styles.gallerySection}`} aria-labelledby="gallery-heading">
      <header className={styles.heading}>
        <div><span>Explore the campus</span><h2 id="gallery-heading">College in pictures</h2></div>
        <p><strong>{photos.length}</strong> photographs</p>
      </header>

      <div className={styles.grid}>
        {photos.map((src, index) => <button className={styles.photo} key={src} type="button" onClick={() => setActive(index)} aria-label={`Open campus photograph ${index + 1}`}>
          <Image src={src} alt={`Sangamner College campus photograph ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={index < 5} />
          <span className={styles.photoNumber}>{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.expand}><Expand /></span>
        </button>)}
      </div>
    </section>

    {active !== null && <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`Campus photograph ${active + 1} of ${photos.length}`} onMouseDown={event => event.target === event.currentTarget && close()}>
      <div className={styles.lightboxTop}><span>{String(active + 1).padStart(2, "0")} / {photos.length}</span><button type="button" onClick={close} aria-label="Close gallery"><X /></button></div>
      <button className={`${styles.lightboxNav} ${styles.previous}`} type="button" onClick={previous} aria-label="Previous photograph"><ChevronLeft /></button>
      <div className={styles.lightboxImage}><Image src={photos[active]} alt={`Sangamner College campus photograph ${active + 1}`} fill priority sizes="95vw" /></div>
      <button className={`${styles.lightboxNav} ${styles.next}`} type="button" onClick={next} aria-label="Next photograph"><ChevronRight /></button>
      <p>Campus photograph {active + 1}</p>
    </div>}
  </main>;
}
