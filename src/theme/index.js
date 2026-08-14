import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => {
  const isDark = mode === 'dark';
  return {
    palette: {
      mode,
      primary: {
        main: isDark ? '#00d4aa' : '#059669',
        light: isDark ? '#5eead4' : '#10b981',
        dark: isDark ? '#0f766e' : '#047857',
        contrastText: isDark ? '#0a0a0f' : '#ffffff',
      },
      secondary: {
        main: isDark ? '#a78bfa' : '#7c3aed',
        light: isDark ? '#c4b5fd' : '#8b5cf6',
        dark: isDark ? '#6d28d9' : '#6d28d9',
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? '#0a0a0f' : '#f8fafc',
        paper: isDark ? '#12121a' : '#ffffff',
        subtle: isDark ? 'rgba(0, 212, 170, 0.06)' : 'rgba(5, 150, 105, 0.08)',
        gradientStart: isDark ? '#0f0f18' : '#eef2ff',
        gradientEnd: isDark ? '#0a0a0f' : '#f8fafc',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
      },
    },
    typography: {
      fontFamily: '"Outfit", "Inter", "Segoe UI", system-ui, sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  };
};

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
