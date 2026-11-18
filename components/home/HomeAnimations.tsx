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

    const cleanup: Array<() => void> = [];

    const context = gsap.context(() => {
      const heroCopy = root.querySelector<HTMLElement>(`.${s.heroCopy}`);
      const heroVisual = root.querySelector<HTMLElement>(`.${s.heroVisual}`);
      const heroFrame = root.querySelector<HTMLElement>(`.${s.heroFrame}`);
      const heroFact = root.querySelector<HTMLElement>(`.${s.heroFact}`);
      const heroAccreditation = root.querySelector<HTMLElement>(`.${s.heroAccreditation}`);
      const heroCounter = root.querySelector<HTMLElement>(`.${s.heroFact} [data-count-up]`);
      const opening = gsap.timeline({ delay: 1.12, defaults: { ease: "power3.out" } });

      if (heroCopy) opening.from(heroCopy.children, { autoAlpha: 0, y: 32, duration: .78, stagger: .085 });
      if (heroVisual) opening.from(heroVisual, { autoAlpha: 0, y: 38, scale: .965, duration: 1 }, "<.08");
      if (heroFrame) opening.from(heroFrame, { clipPath: "inset(0 100% 0 0 round 26px)", duration: 1.05 }, "<.15");
      if (heroFact) opening.from(heroFact, { autoAlpha: 0, x: -24, rotate: -4, duration: .62 }, "<.42");
      if (heroAccreditation) opening.from(heroAccreditation, { autoAlpha: 0, x: 24, rotate: 4, duration: .62 }, "<.08");
      if (heroCounter) opening.add(counterTween(heroCounter), "<.12");

      if (heroVisual && window.matchMedia("(pointer: fine)").matches) {
        const moveFrameX = heroFrame ? gsap.quickTo(heroFrame, "x", { duration: .8, ease: "power3.out" }) : null;
        const moveFrameY = heroFrame ? gsap.quickTo(heroFrame, "y", { duration: .8, ease: "power3.out" }) : null;
        const moveFactX = heroFact ? gsap.quickTo(heroFact, "x", { duration: .65, ease: "power3.out" }) : null;
        const moveFactY = heroFact ? gsap.quickTo(heroFact, "y", { duration: .65, ease: "power3.out" }) : null;
        const moveBadgeX = heroAccreditation ? gsap.quickTo(heroAccreditation, "x", { duration: .65, ease: "power3.out" }) : null;
        const moveBadgeY = heroAccreditation ? gsap.quickTo(heroAccreditation, "y", { duration: .65, ease: "power3.out" }) : null;

        const onPointerMove = (event: PointerEvent) => {
          const bounds = heroVisual.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - .5;
          const y = (event.clientY - bounds.top) / bounds.height - .5;
          moveFrameX?.(x * 10); moveFrameY?.(y * 8);
          moveFactX?.(x * -15); moveFactY?.(y * -12);
          moveBadgeX?.(x * 18); moveBadgeY?.(y * 14);
        };
        const onPointerLeave = () => {
          moveFrameX?.(0); moveFrameY?.(0);
          moveFactX?.(0); moveFactY?.(0);
          moveBadgeX?.(0); moveBadgeY?.(0);
        };

        heroVisual.addEventListener("pointermove", onPointerMove);
        heroVisual.addEventListener("pointerleave", onPointerLeave);
        cleanup.push(() => {
          heroVisual.removeEventListener("pointermove", onPointerMove);
          heroVisual.removeEventListener("pointerleave", onPointerLeave);
        });
      }

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
        `.${s.quickPanel} li`,
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

      const storyYear = root.querySelector<HTMLElement>(`.${s.year}`);
      if (storyYear) {
        gsap.fromTo(storyYear, { xPercent: -7 }, {
          xPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: storyYear, start: "top bottom", end: "bottom top", scrub: .8 },
        });
      }

      const ribbon = root.querySelector<HTMLElement>(`.${s.ribbon}`);
      if (ribbon) {
        gsap.from(ribbon, {
          xPercent: -4,
          autoAlpha: 0,
          duration: .9,
          ease: "power3.out",
          scrollTrigger: { trigger: ribbon, start: "top 94%", once: true },
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      cleanup.forEach((dispose) => dispose());
      context.revert();
    };
  }, []);

  return null;
}
