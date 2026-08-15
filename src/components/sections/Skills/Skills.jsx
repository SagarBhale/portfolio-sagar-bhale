import React, { useState, useRef, useMemo, useCallback } from 'react';
import { skills as data } from '../../../data/portfolio';
import { useGsapScrollTrigger, gsap } from '../../../hooks/useGsapScrollTrigger';
import styles from './Skills.module.css';

/**
 * 3D Interactive Skill Card with GSAP mouse tilt & light sweep
 */
function SkillCard3D({ item, color }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
    });

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className={styles.skillCard}
      style={{ '--accent-color': color }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardMainInfo}>
          <div className={styles.cardTitleRow}>
            <h4 className={styles.skillName}>{item.name}</h4>
            <span className={styles.tagBadge}>{item.tag}</span>
          </div>
          <p className={styles.skillDesc}>{item.desc}</p>
        </div>
        <span className={styles.expBadge}>{item.exp}</span>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressMeta}>
          <span className={styles.levelLabel} style={{ color }}>
            {item.level}
          </span>
          <span className={styles.pctText}>{item.progress}%</span>
        </div>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{
              width: `${item.progress}%`,
              background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            }}
          >
            <span className={styles.glowDot} style={{ background: color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Skills = React.memo(function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  // Apply GSAP ScrollTrigger for staggered 3D card reveals
  useGsapScrollTrigger(containerRef, `.${styles.skillCard}`, {
    y: 50,
    rotationX: -15,
    stagger: 0.08,
    duration: 0.7,
  });

  // Filter skills based on tab & search query
  const filteredCategories = useMemo(() => {
    return data.map((cat) => {
      const isCatMatch = activeCategory === 'all' || cat.id === activeCategory;
      if (!isCatMatch) return null;

      const matchingItems = cat.items.filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.level.toLowerCase().includes(q)
        );
      });

      if (!matchingItems.length) return null;

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean);
  }, [activeCategory, searchQuery]);

  const totalSkillsCount = useMemo(() => {
    return data.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>⚡ Technical Matrix</span>
          <h2 className={styles.heading}>Skills & Capabilities</h2>
          <p className={styles.subheading}>
            A comprehensive matrix of technologies, frameworks, and architecture tools I use to build production systems
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className={styles.controlsBar}>
          {/* Category Tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Tech categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              className={`${styles.tab} ${activeCategory === 'all' ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span className={styles.tabIcon}>🚀</span>
              All ({totalSkillsCount})
            </button>
            {data.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={activeCategory === cat.id ? { '--tab-color': cat.color } : {}}
              >
                <span className={styles.tabIcon}>{cat.icon}</span>
                {cat.category.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className={styles.searchWrap}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={styles.searchIcon}
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search skill (e.g., React, Node, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.searchClear}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Bento Matrix Grid */}
        {filteredCategories.length > 0 ? (
          <div className={styles.matrixGrid}>
            {filteredCategories.map((cat) => (
              <div key={cat.id} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <div
                    className={styles.catIconWrap}
                    style={{
                      background: `${cat.color}15`,
                      borderColor: `${cat.color}35`,
                      color: cat.color,
                    }}
                  >
                    <span>{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className={styles.catTitle}>{cat.category}</h3>
                    <p className={styles.catDesc}>{cat.description}</p>
                  </div>
                </div>

                <div className={styles.bentoCardsGrid}>
                  {cat.items.map((item) => (
                    <SkillCard3D key={item.name} item={item} color={cat.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No skills matching "{searchQuery}"</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

export default Skills;
