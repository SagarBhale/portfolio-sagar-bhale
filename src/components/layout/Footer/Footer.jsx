import React, { useCallback } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSmoothScroll } from '../../../hooks/useSmoothScroll';
import { contact as contactData, hero } from '../../../data/portfolio';
import styles from './Footer.module.css';

const iconMap = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
};

const Footer = React.memo(function Footer() {
  const { scrollToSection } = useSmoothScroll();

  const handleBackToTop = useCallback(() => {
    scrollToSection('hero');
  }, [scrollToSection]);

  const social = contactData.social || [];

  return (
    <footer className={styles.root} role="contentinfo">
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logoBracket}>&lt;</span>
            <span className={styles.logoText}>Dev</span>
            <span className={styles.logoBracket}>/&gt;</span>
          </div>
          <p className={styles.tagline}>
            Building the future, one commit at a time. 🚀
          </p>
          <div className={styles.social}>
            {social.map(({ name, url, icon }) => {
              const Icon = iconMap[icon] || GitHubIcon;
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={name}
                >
                  <Icon fontSize="small" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {hero.name || 'Portfolio'}. All rights reserved.
          </p>
          <p className={styles.built}>
            Built with <span className={styles.heart}>♥</span> using React + Three.js + MUI
          </p>
          <button
            type="button"
            className={styles.backTop}
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            <ArrowUpwardIcon fontSize="small" />
          </button>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
