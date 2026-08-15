import React, { Suspense, lazy, useEffect, useState, useRef, useCallback } from 'react';
import { useSmoothScroll } from '../../../hooks/useSmoothScroll';
import { useThemeMode } from '../../../hooks/useThemeMode';
import { hero as data } from '../../../data/portfolio';
import { gsap } from '../../../hooks/useGsapScrollTrigger';
import styles from './Hero.module.css';

const Scene3D = lazy(() => import('./Scene3D'));

const TYPING_TITLES = [
  'Full Stack Developer (MERN)',
  'Next.js & TypeScript Engineer',
  'AI Tools & Microservices Dev',
  'Three.js 3D Web Creator',
];

function useTypingEffect(words, speed = 75, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pauseMs]);

  return displayed;
}

const Hero = React.memo(function Hero() {
  const { scrollToSection } = useSmoothScroll();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const typedTitle = useTypingEffect(TYPING_TITLES);
  const contentRef = useRef(null);

  // GSAP Entrance Timeline on Mount
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        `.${styles.badge}`,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }
      )
        .fromTo(
          `.${styles.name}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.2'
        )
        .fromTo(
          `.${styles.typingTitle}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          `.${styles.tagline}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          `.${styles.btn}`,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          `.${styles.statItem}`,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.2'
        );
    }, container);

    return () => ctx.revert();
  }, []);

  // GSAP Magnetic Hover Effect for Buttons
  const handleBtnMouseMove = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleBtnMouseLeave = useCallback((e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  return (
    <section id="hero" className={styles.section}>
      {/* Three.js Background */}
      <Suspense fallback={<div className={styles.scene3d} aria-hidden />}>
        <Scene3D isDark={isDark} />
      </Suspense>

      {/* Gradient overlay */}
      <div className={styles.overlay} aria-hidden />

      {/* Content */}
      <div className={styles.content} ref={contentRef}>
        {/* Badge row */}
        <div className={styles.badgeRow} aria-hidden>
          {data.badges.map((badge) => (
            <span key={badge} className={styles.badge}>
              {badge}
            </span>
          ))}
        </div>

        <h1 className={styles.name}>
          Hi, I'm <span className={styles.nameHighlight}>{data.name}</span>
        </h1>

        <p className={styles.typingTitle} aria-label={data.title}>
          <span className={styles.typingText}>{typedTitle}</span>
          <span className={styles.cursor} aria-hidden>
            |
          </span>
        </p>

        <p className={styles.tagline}>{data.tagline}</p>

        <div className={styles.ctas}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => scrollToSection('projects')}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
          >
            <span>View Projects</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => scrollToSection('contact')}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
          >
            Get in Touch
          </button>
          {data.resumeUrl && (
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href={data.resumeUrl}
              download
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Resume
            </a>
          )}
        </div>

        {/* Quick stats row */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>2+</span>
            <span className={styles.statLabel}>Years Exp.</span>
          </div>
          <div className={styles.statDivider} aria-hidden />
          <div className={styles.statItem}>
            <span className={styles.statNum}>5+</span>
            <span className={styles.statLabel}>Enterprise Apps</span>
          </div>
          <div className={styles.statDivider} aria-hidden />
          <div className={styles.statItem}>
            <span className={styles.statNum}>20+</span>
            <span className={styles.statLabel}>Technologies</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className={styles.scrollIndicator}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('about');
        }}
        aria-label="Scroll down to About section"
      >
        <div className={styles.scrollDot} />
      </a>
    </section>
  );
});

export default Hero;
