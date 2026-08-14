import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const callback = useCallback(([entry]) => {
    const visible = entry?.isIntersecting ?? false;
    setIsIntersecting(visible);
    if (visible) setHasIntersected(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(callback, opts);
    observer.observe(node);
    return () => observer.disconnect();
  }, [callback, opts.root, opts.rootMargin, opts.threshold]);

  return [ref, isIntersecting, hasIntersected];
}
