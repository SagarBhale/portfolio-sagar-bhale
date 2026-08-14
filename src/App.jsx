import React, { useState, useCallback, lazy, Suspense } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import { Helmet } from 'react-helmet-async';

const Hero = lazy(() => import('./components/sections/Hero/Hero'));
const About = lazy(() => import('./components/sections/About/About'));
const Skills = lazy(() => import('./components/sections/Skills/Skills'));
const Projects = lazy(() => import('./components/sections/Projects/Projects'));
const Experience = lazy(() => import('./components/sections/Experience/Experience'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));

function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });

  const handleSnackbar = useCallback((options) => {
    setSnackbar({
      open: true,
      message: options?.message ?? 'Done',
      type: options?.type ?? 'success',
    });
  }, []);

  const handleCloseSnackbar = useCallback((_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio | Full Stack Developer · Python & AI Engineer</title>
        <meta name="description" content="Professional portfolio of a Full Stack Developer specializing in MERN stack, Python AI/ML applications, and Three.js 3D web experiences. Available for freelance and full-time opportunities." />
        <meta name="keywords" content="Full Stack Developer, MERN Stack, Python, AI, Machine Learning, React, Node.js, Three.js, Portfolio" />
        <meta property="og:title" content="Portfolio | Full Stack Developer · Python & AI Engineer" />
        <meta property="og:description" content="Building intelligent, scalable web applications with MERN stack & AI-powered solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00d4aa" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Helmet>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<Loader size="large" />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact onSnackbar={handleSnackbar} />
        </Suspense>
      </main>
      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          variant="filled"
          sx={{ borderRadius: '12px', fontFamily: 'Outfit, sans-serif' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
