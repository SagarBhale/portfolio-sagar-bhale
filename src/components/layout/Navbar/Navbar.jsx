import React, { useCallback, useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import { useScrollSpy } from '../../../hooks/useScrollSpy';
import { useSmoothScroll } from '../../../hooks/useSmoothScroll';
import { useToggle } from '../../../hooks/useToggle';
import { navSections } from '../../../data/portfolio';
import styles from './Navbar.module.css';

const sectionIds = navSections.map((s) => s.id);

const Navbar = React.memo(function Navbar() {
  const activeId = useScrollSpy(sectionIds, { offset: 120 });
  const { scrollToSection } = useSmoothScroll();
  const [drawerOpen, toggleDrawer, { setFalse: closeDrawer }] = useToggle(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback(
    (sectionId) => {
      scrollToSection(sectionId);
      closeDrawer();
    },
    [scrollToSection, closeDrawer]
  );

  return (
    <>
      <header className={`${styles.root} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          >
            <span className={styles.logoBracket}>&lt;</span>
            <span className={styles.logoText}>Dev</span>
            <span className={styles.logoBracket}>/&gt;</span>
          </a>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.navLink} ${activeId === id ? styles.navLinkActive : ''}`}
                onClick={() => handleNavClick(id)}
                aria-current={activeId === id ? 'page' : undefined}
              >
                {label}
                {activeId === id && <span className={styles.activePill} aria-hidden />}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <ThemeToggle />
            <button
              type="button"
              className={`${styles.menuButton} ${drawerOpen ? styles.menuButtonOpen : ''}`}
              onClick={toggleDrawer}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className={styles.drawerBackdrop}
            onClick={closeDrawer}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <nav className={styles.drawer} role="dialog" aria-label="Mobile navigation">
            <div className={styles.drawerLogo}>
              <span className={styles.logoBracket}>&lt;</span>
              <span className={styles.logoText}>Dev</span>
              <span className={styles.logoBracket}>/&gt;</span>
            </div>
            {navSections.map(({ id, label }, idx) => (
              <button
                key={id}
                type="button"
                className={`${styles.drawerLink} ${activeId === id ? styles.drawerLinkActive : ''}`}
                onClick={() => handleNavClick(id)}
                style={{ animationDelay: `${idx * 50}ms` }}
                aria-current={activeId === id ? 'page' : undefined}
              >
                <span className={styles.drawerNum}>0{idx + 1}</span>
                {label}
              </button>
            ))}
          </nav>
        </>
      )}
    </>
  );
});

export default Navbar;
