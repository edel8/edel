"use client";
import { useEffect, useRef, ReactNode } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: any;
    const init = async () => {
      if (typeof window === "undefined") return;
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis not available, falling back to native scroll", e);
      }
    };
    init();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
