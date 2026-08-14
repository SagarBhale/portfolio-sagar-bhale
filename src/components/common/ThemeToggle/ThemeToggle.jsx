import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../../../hooks/useThemeMode';
import styles from './ThemeToggle.module.css';

const ThemeToggle = React.memo(function ThemeToggle({ className = '' }) {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={`${styles.button} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <LightModeIcon className={styles.icon} aria-hidden />
      ) : (
        <DarkModeIcon className={styles.icon} aria-hidden />
      )}
    </button>
  );
});

export default ThemeToggle;
