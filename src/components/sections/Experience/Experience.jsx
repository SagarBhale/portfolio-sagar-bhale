import React, { useRef } from 'react';
import { experience as data } from '../../../data/portfolio';
import { useGsapScrollTrigger } from '../../../hooks/useGsapScrollTrigger';
import styles from './Experience.module.css';

const Experience = React.memo(function Experience() {
  const containerRef = useRef(null);

  // GSAP ScrollTrigger for timeline items
  useGsapScrollTrigger(containerRef, `.${styles.timelineItem}`, {
    y: 50,
    stagger: 0.2,
    duration: 0.8,
  });

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>Career</span>
          <h2 className={styles.heading}>Work Experience</h2>
          <p className={styles.subheading}>Where I've built things that matter</p>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {data.map((item, i) => (
            <div
              key={item.company + item.role}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* Timeline dot + line connector */}
              <div className={styles.connector}>
                <div className={styles.dot} />
                {i < data.length - 1 && <div className={styles.line} />}
              </div>

              {/* Card */}
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.typeTag}>{item.type}</div>
                  <div className={styles.duration}>{item.duration}</div>
                </div>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.company}>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4z" />
                  </svg>
                  {item.company}
                </p>
                <ul className={styles.achievements}>
                  {item.achievements.map((ach, j) => (
                    <li key={j} className={styles.achievement}>
                      <span className={styles.achDot} aria-hidden />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
