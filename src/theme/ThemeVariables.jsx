import { useEffect } from 'react';

/**
 * Injects MUI palette (and other theme tokens) as CSS variables
 * so CSS Modules can use var(--mui-palette-*).
 * Sets data-theme for light/dark specific styling.
 */
export function ThemeVariables({ theme }) {
  useEffect(() => {
    const root = document.documentElement;
    if (!theme?.palette) return;

    const { primary, secondary, background, text, error, action, divider } = theme.palette;
    const mode = theme.palette.mode;

    root.setAttribute('data-theme', mode);

    const set = (key, value) => {
      if (value != null && value !== '') root.style.setProperty(key, value);
    };

    set('--mui-palette-primary-main', primary?.main);
    set('--mui-palette-primary-light', primary?.light);
    set('--mui-palette-primary-dark', primary?.dark);
    set('--mui-palette-primary-contrastText', primary?.contrastText);
    set('--mui-palette-secondary-main', secondary?.main);
    set('--mui-palette-secondary-light', secondary?.light);
    set('--mui-palette-secondary-dark', secondary?.dark);
    set('--mui-palette-secondary-contrastText', secondary?.contrastText);
    set('--mui-palette-background-default', background?.default);
    set('--mui-palette-background-paper', background?.paper);
    set('--mui-palette-text-primary', text?.primary);
    set('--mui-palette-text-secondary', text?.secondary);
    set('--mui-palette-error-main', error?.main);
    set('--mui-palette-action-hover', action?.hover);
    set('--mui-palette-action-selected', action?.selected);
    set('--mui-palette-divider', divider);
    set('--mui-palette-background-subtle', background?.subtle);
    set('--mui-palette-background-gradientStart', background?.gradientStart);
    set('--mui-palette-background-gradientEnd', background?.gradientEnd);
  }, [theme]);

  return null;
}
