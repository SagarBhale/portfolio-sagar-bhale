import { useCallback } from 'react';

export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId, options = {}) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const { behavior = 'smooth', block = 'start' } = options;
    element.scrollIntoView({ behavior, block });
  }, []);

  return { scrollToSection };
}
