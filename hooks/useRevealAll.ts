"use client";

import { useEffect } from "react";

/**
 * Drives the .reveal / .is-shown scroll-in system via direct DOM
 * manipulation (not React state) so a single observer can cover every
 * marked element without per-node re-renders.
 */
export function useRevealAll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduceMotion || elements.length === 0) return;

    const show = (el: Element) => el.classList.add("is-shown");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));

    // 1. immediate sweep for anything already in view
    const sweep = () => {
      const cutoff = window.innerHeight * 0.92;
      elements.forEach((el) => {
        if (el.getBoundingClientRect().top < cutoff) {
          show(el);
          observer.unobserve(el);
        }
      });
    };
    sweep();

    // 2. second sweep after layout/fonts settle
    const raf = requestAnimationFrame(sweep);
    const timeout = window.setTimeout(sweep, 260);

    // 3. failsafe: reveal everything still hidden
    const failsafe = window.setTimeout(() => {
      elements.forEach(show);
      observer.disconnect();
    }, 2400);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.clearTimeout(failsafe);
    };
  }, []);
}
