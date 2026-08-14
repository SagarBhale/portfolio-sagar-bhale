import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { getTheme } from './theme';
import { ThemeVariables } from './theme/ThemeVariables';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { useThemeMode } from './hooks/useThemeMode';
import './index.css';

function ThemeWrapper({ children }) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <ThemeVariables theme={theme} />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeModeProvider>
          <ThemeWrapper>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </ThemeWrapper>
        </ThemeModeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
