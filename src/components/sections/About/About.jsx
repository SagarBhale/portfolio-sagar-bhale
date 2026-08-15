import React, { useEffect, useRef, useState } from 'react';
import { about as data, stats } from '../../../data/portfolio';
import { useGsapScrollTrigger } from '../../../hooks/useGsapScrollTrigger';
import styles from './About.module.css';

function useCountUp(target, duration = 1800, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function StatCounter({ stat }) {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(stat.value, 1800, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.statCard} ref={ref}>
      <span className={styles.statValue}>
        {count}
        {stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

const About = React.memo(function About() {
  const containerRef = useRef(null);

  // Apply GSAP ScrollTrigger
  useGsapScrollTrigger(containerRef, `.${styles.statCard}`, {
    y: 35,
    stagger: 0.1,
    duration: 0.7,
  });

  useGsapScrollTrigger(containerRef, `.${styles.profileCard}, .${styles.summaryBlock}, .${styles.highlightsBlock}`, {
    y: 45,
    stagger: 0.15,
    duration: 0.8,
  });

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>About Me</span>
          <h2 className={styles.heading}>Crafting Digital Experiences</h2>
          <p className={styles.subheading}>
            A passionate developer blending technical expertise with creative problem-solving
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.avatarRing}>
              <div className={styles.avatar}>
                <svg viewBox="0 0 80 80" fill="none" className={styles.avatarIcon}>
                  <circle cx="40" cy="30" r="18" fill="url(#avatarGrad)" opacity="0.9" />
                  <ellipse cx="40" cy="65" rx="26" ry="16" fill="url(#avatarGrad)" opacity="0.7" />
                  <defs>
                    <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00d4aa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className={styles.profileName}>{data.name || 'Sagar Bhale'}</div>
            <div className={styles.profileRole}>Full Stack Developer (MERN)</div>
            <div className={styles.profileTags}>
              {data.interests.map((interest) => (
                <span key={interest} className={styles.profileTag}>
                  {interest}
                </span>
              ))}
            </div>
            {/* Education */}
            {data.education && (
              <div className={styles.educationCard}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={styles.eduIcon}
                  aria-hidden
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <div>
                  <div className={styles.eduDegree}>{data.education.degree}</div>
                  <div className={styles.eduUniversity}>
                    {data.education.university} · {data.education.year}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.summaryBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.titleDot} />
                My Story
              </h3>
              <p className={styles.summary}>{data.summary}</p>
            </div>

            <div className={styles.highlightsBlock}>
              <h3 className={styles.blockTitle}>
                <span className={styles.titleDot} />
                What I Do
              </h3>
              <ul className={styles.highlightsList}>
                {data.highlights.map((item, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <span className={styles.checkIcon} aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
