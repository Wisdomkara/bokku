import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealOptions = {
  selector?: string;
  stagger?: number;
  y?: number;
  x?: number;
};

gsap.registerPlugin(ScrollTrigger);

const useGsapReveal = (
  containerRef: RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(
        options.selector ?? ".reveal, .reveal-left"
      )
    );

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      elements.forEach((element, index) => {
        const isLeft = element.classList.contains("reveal-left");
        const fromX = isLeft ? -40 : options.x ?? 0;
        const fromY = isLeft ? 0 : options.y ?? 32;

        gsap.fromTo(
          element,
          { x: fromX, y: fromY },
          {
            y: 0,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: (options.stagger ?? 0.08) * index,
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, options.selector, options.stagger, options.x, options.y]);
};

export default useGsapReveal;
