import React, { useState, useRef, useEffect } from 'react';
import { skills as data } from '../../../data/portfolio';
import styles from './Skills.module.css';

function SkillBar({ name, level, progress, color }) {
  const barRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.skillRow} ref={barRef}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel} style={{ color }}>{level}</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: animated ? `${progress}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
        <span className={styles.barPct}>{progress}%</span>
      </div>
    </div>
  );
}

const Skills = React.memo(function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = data[activeTab];

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>Technical Skills</span>
          <h2 className={styles.heading}>My Tech Stack</h2>
          <p className={styles.subheading}>
            Technologies I use to build intelligent, scalable, and beautiful applications
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabs} role="tablist" aria-label="Skill categories">
          {data.map((cat, idx) => (
            <button
              key={cat.category}
              role="tab"
              type="button"
              aria-selected={activeTab === idx}
              className={`${styles.tab} ${activeTab === idx ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(idx)}
              style={activeTab === idx ? { '--tab-color': cat.color } : {}}
            >
              <span className={styles.tabIcon}>{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Panel */}
        <div
          key={activeTab}
          className={styles.panel}
          role="tabpanel"
          aria-label={activeCategory.category}
        >
          <div className={styles.panelHeader}>
            <div
              className={styles.panelIconBig}
              style={{ background: `${activeCategory.color}18`, borderColor: `${activeCategory.color}33` }}
            >
              <span>{activeCategory.icon}</span>
            </div>
            <div>
              <h3 className={styles.panelTitle} style={{ color: activeCategory.color }}>
                {activeCategory.category}
              </h3>
              <p className={styles.panelSub}>{activeCategory.items.length} technologies</p>
            </div>
          </div>

          <div className={styles.skillsList}>
            {activeCategory.items.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                progress={skill.progress}
                color={activeCategory.color}
              />
            ))}
          </div>
        </div>

        {/* All-Category Overview Pills */}
        <div className={styles.overviewGrid}>
          {data.map((cat) =>
            cat.items.map((skill) => (
              <div
                key={`${cat.category}-${skill.name}`}
                className={styles.overviewPill}
                style={{ '--pill-color': cat.color }}
                title={`${skill.name} — ${skill.level}`}
              >
                {skill.name}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
});

export default Skills;
