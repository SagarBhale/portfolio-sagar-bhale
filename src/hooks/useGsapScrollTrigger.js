import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom React hook for registering GSAP ScrollTrigger stagger animations
 * @param {React.RefObject} containerRef - Parent container reference
 * @param {string} selector - CSS selector for target child elements
 * @param {Object} options - Custom GSAP animation options
 */
export function useGsapScrollTrigger(containerRef, selector, options = {}) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options.y ?? 40,
          scale: options.scale ?? 0.95,
          rotationX: options.rotationX ?? 0,
          ...options.from,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? 0.1,
          ease: options.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none reverse',
            ...options.scrollTrigger,
          },
          ...options.to,
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector, JSON.stringify(options)]);
}

export { gsap, ScrollTrigger };
