"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MAIN_MENU_ROUTES = new Set([
  "/about-sp-sanstha",
  "/about-college",
  "/organogram",
  "/administration",
  "/autonomy",
  "/autonomous-governing-body",
  "/autonomous-composition-academic-council",
  "/autonomous-bos",
  "/autonomous-finance-committee",
  "/autonomous-committee-new",
  "/meeting-minutes",
  "/ugc-compliance",
  "/departments",
  "/arts",
  "/commerce",
  "/science",
  "/vocational-degrees",
  "/iqac",
  "/library",
  "/examination",
  "/photo-gallery",
  "/contact",
]);

export function MainMenuPageAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (!MAIN_MENU_ROUTES.has(pathname) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = document.querySelector<HTMLElement>("body > main, body > div > main");
    if (!main) return;

    const context = gsap.context(() => {
      const hero = main.querySelector<HTMLElement>(":scope > section:first-child, .page-hero, .legacy-page > main > section:first-child");
      const heroImage = hero?.querySelector<HTMLElement>("img");
      const heroContent = hero?.querySelector<HTMLElement>(".container") ?? hero;

      const entrance = gsap.timeline({ delay: document.body.dataset.siteOpening === "active" ? 1.05 : 0, defaults: { ease: "power3.out" } });
      entrance.from(main, { autoAlpha: 0, duration: .28 });
      if (hero) entrance.from(hero, { clipPath: "inset(0 0 10% 0)", y: 20, duration: .8 }, "<");
      if (heroImage) entrance.from(heroImage, { scale: 1.09, duration: 1.35, ease: "power2.out" }, "<");
      if (heroContent) {
        const content = Array.from(heroContent.children).filter((element) => element.tagName !== "STYLE");
        entrance.from(content, { autoAlpha: 0, y: 28, duration: .68, stagger: .09 }, "<.12");
      }

      const sections = Array.from(main.querySelectorAll<HTMLElement>("section")).filter((section) => section !== hero);
      sections.forEach((section) => {
        const heading = section.querySelector<HTMLElement>("h2, header, :scope > .container > div:first-child");
        if (heading) {
          gsap.from(heading, {
            autoAlpha: 0,
            y: 34,
            filter: "blur(6px)",
            duration: .78,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 88%", once: true },
          });
        }
      });

      const cards = main.querySelectorAll<HTMLElement>([
        "article",
        ".legacy-page .grid > a",
        ".legacy-page .grid > div",
        "[class*='grid'] > a",
        "[class*='grid'] > article",
        "[class*='Card']",
        "button[class*='photo']",
      ].join(","));

      if (cards.length) {
        ScrollTrigger.batch(Array.from(cards), {
          start: "top 92%",
          once: true,
          onEnter: (elements) => gsap.from(elements, {
            autoAlpha: 0,
            y: 30,
            scale: .98,
            duration: .68,
            stagger: .055,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          }),
        });
      }

      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: .7 },
        });
      }

      ScrollTrigger.refresh();
    }, main);

    return () => context.revert();
  }, [pathname]);

  return null;
}
