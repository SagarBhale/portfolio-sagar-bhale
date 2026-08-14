import React, { createContext, useState, useCallback, useMemo } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

const getInitialMode = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [mode, setModeState] = useState(getInitialMode);

  const setMode = useCallback((newMode) => {
    setModeState((prev) => {
      const next = typeof newMode === 'function' ? newMode(prev) : newMode;
      if (typeof window !== 'undefined') localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  }, [setMode]);

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode, setMode, toggleMode]
  );

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
