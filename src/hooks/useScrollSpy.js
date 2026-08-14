import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from './useDebounce';

const DEFAULT_OFFSET = 100;

export function useScrollSpy(sectionIds, options = {}) {
  const { offset = DEFAULT_OFFSET } = options;
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null);

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY ?? window.pageYOffset;
    let current = null;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY - offset;
      if (scrollY >= top) {
        current = sectionIds[i];
        break;
      }
    }

    setActiveId((prev) => (current !== prev ? (current ?? sectionIds[0]) : prev));
  }, [sectionIds, offset]);

  const debouncedUpdate = useDebouncedCallback(updateActiveSection, 80);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener('scroll', debouncedUpdate, { passive: true });
    return () => window.removeEventListener('scroll', debouncedUpdate);
  }, [debouncedUpdate, updateActiveSection]);

  return activeId;
}
