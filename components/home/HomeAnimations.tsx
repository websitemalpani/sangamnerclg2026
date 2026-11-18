"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "@/app/home.module.css";

gsap.registerPlugin(ScrollTrigger);

function formatCount(value: number, decimals: number, suffix: string) {
  return `${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)}${suffix}`;
}

function counterTween(element: HTMLElement, delay = 0) {
  const end = Number(element.dataset.end ?? 0);
  const decimals = Number(element.dataset.decimals ?? 0);
  const suffix = element.dataset.suffix ?? "";
  const state = { value: 0 };

  return gsap.to(state, {
    value: end,
    duration: 1.45,
    delay,
    ease: "power3.out",
    onStart: () => { element.textContent = formatCount(0, decimals, suffix); },
    onUpdate: () => { element.textContent = formatCount(state.value, decimals, suffix); },
    onComplete: () => { element.textContent = formatCount(end, decimals, suffix); },
  });
}

export function HomeAnimations() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-home-motion-root]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const heroCopy = root.querySelector<HTMLElement>(`.${s.heroCopy}`);
      const heroVisual = root.querySelector<HTMLElement>(`.${s.heroVisual}`);
      const heroCounter = root.querySelector<HTMLElement>(`.${s.heroFact} [data-count-up]`);
      const opening = gsap.timeline({ delay: 1.12, defaults: { ease: "power3.out" } });

      if (heroCopy) opening.from(heroCopy.children, { autoAlpha: 0, y: 28, duration: .72, stagger: .075 });
      if (heroVisual) opening.from(heroVisual, { autoAlpha: 0, y: 34, scale: .975, duration: .9 }, "<.08");
      if (heroCounter) opening.add(counterTween(heroCounter), "<.12");

      const revealSelector = [
        `.${s.heading}`, `.${s.storyGrid}`, `.${s.updatesGrid}`,
        `.${s.leadershipHead}`, `.${s.ctaInner}`,
      ].join(",");

      gsap.utils.toArray<HTMLElement>(revealSelector, root).forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 42,
          filter: "blur(7px)",
          duration: .85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      const cardSelector = [
        `.${s.bentoHero}`, `.${s.tile}`, `.${s.bentoIdea}`,
        `.${s.values} li`, `.${s.stats} > div`, `.${s.explorerList} li`,
        `.${s.mosaicItem}`, `.${s.board}`, `.${s.research}`, `.${s.leadershipCard}`,
      ].join(",");

      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>(cardSelector, root), {
        start: "top 90%",
        once: true,
        onEnter: (elements) => gsap.from(elements, {
          autoAlpha: 0,
          y: 34,
          scale: .975,
          duration: .72,
          stagger: .08,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }),
      });

      root.querySelectorAll<HTMLElement>(`.${s.stats} [data-count-up]`).forEach((counter, index) => {
        ScrollTrigger.create({
          trigger: counter,
          start: "top 88%",
          once: true,
          onEnter: () => { counterTween(counter, index * .06); },
        });
      });

      root.querySelectorAll<HTMLElement>(`.${s.mosaicItem}`).forEach((item) => {
        const image = item.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -4, scale: 1.07 }, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: .6 },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
