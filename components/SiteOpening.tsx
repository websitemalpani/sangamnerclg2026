"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./SiteOpening.module.css";

export function SiteOpening() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.remove();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.siteOpening = "active";

    const context = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          delete document.body.dataset.siteOpening;
          root.remove();
        },
      })
        .from(`.${styles.orbit}`, { scale: .45, rotate: -35, autoAlpha: 0, duration: .65 })
        .from(`.${styles.logo}`, { scale: .6, rotate: 12, autoAlpha: 0, duration: .55 }, "<.08")
        .from(`.${styles.word} span`, { yPercent: 115, duration: .55, stagger: .055 }, "<.05")
        .from(`.${styles.meta}`, { y: 12, autoAlpha: 0, duration: .35 }, "<.2")
        .fromTo(`.${styles.progressFill}`, { scaleX: 0 }, { scaleX: 1, duration: .72, ease: "power2.inOut" }, "<.05")
        .to(`.${styles.content}`, { y: -18, autoAlpha: 0, duration: .28, ease: "power2.in" }, ">-.05")
        .to(`.${styles.panelTop}`, { yPercent: -100, duration: .72, ease: "power4.inOut" }, "<")
        .to(`.${styles.panelBottom}`, { yPercent: 100, duration: .72, ease: "power4.inOut" }, "<")
        .to(root, { autoAlpha: 0, duration: .12 }, "<.58");
    }, root);

    return () => {
      context.revert();
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.siteOpening;
    };
  }, []);

  return <div ref={rootRef} className={styles.opening} aria-hidden="true">
    <div className={styles.panelTop} /><div className={styles.panelBottom} /><div className={styles.texture} />
    <div className={styles.content}>
      <div className={styles.mark}><span className={styles.orbit} /><Image className={styles.logo} src="/images/brand/sangamner-college-logo.png" alt="" width={104} height={104} priority /></div>
      <div className={styles.title}><span className={styles.word}><span>Sangamner</span></span><span className={`${styles.word} ${styles.accent}`}><span>College</span></span></div>
      <p className={styles.meta}>Knowledge <i /> Character <i /> Confidence</p>
      <div className={styles.progress}><span className={styles.progressFill} /></div>
    </div>
    <span className={styles.year}>Est. 1961</span><span className={styles.location}>Maharashtra, India</span>
  </div>;
}
