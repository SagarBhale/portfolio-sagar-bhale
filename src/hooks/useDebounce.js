import { useState, useEffect, useCallback } from 'react';

/**
 * Returns a debounced value that updates after delay ms of no changes.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Returns a debounced callback that fires after delay ms of no invocations.
 */
export function useDebouncedCallback(callback, delay) {
  const [timeoutId, setTimeoutId] = useState(null);
  const callbackRef = useCallback(callback, [callback]);

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(() => {
        callbackRef(...args);
        setTimeoutId(null);
      }, delay);
      setTimeoutId(id);
    },
    [delay, callbackRef, timeoutId]
  );

  useEffect(() => () => timeoutId && clearTimeout(timeoutId), [timeoutId]);

  return debouncedFn;
}
