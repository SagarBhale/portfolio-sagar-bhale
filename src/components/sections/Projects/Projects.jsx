import React, { useState, useRef } from 'react';
import { projects as data } from '../../../data/portfolio';
import { useGsapScrollTrigger } from '../../../hooks/useGsapScrollTrigger';
import styles from './Projects.module.css';

const FILTERS = ['All', 'MERN', 'Python/AI'];

function ProjectCard({ project }) {
  if (project.placeholder) {
    return (
      <div className={styles.placeholderCard}>
        <div className={styles.placeholderIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
          </svg>
        </div>
        <h3 className={styles.placeholderTitle}>Coming Soon</h3>
        <p className={styles.placeholderDesc}>{project.description}</p>
        <div className={styles.placeholderTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.placeholderBadge}>🚧 In Progress</div>
      </div>
    );
  }

  return (
    <div className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}>
      {project.featured && (
        <div className={styles.featuredBadge}>⭐ Featured</div>
      )}
      <div className={styles.cardImageWrap}>
        <img
          src={project.image}
          alt={project.title}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.cardImageOverlay}>
          <div className={styles.cardLinks}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                aria-label={`GitHub for ${project.title}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cardLink} ${styles.cardLinkPrimary}`}
                aria-label={`Live demo for ${project.title}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardCategory}>
          <span className={`${styles.categoryDot} ${project.category === 'MERN' ? styles.dotMern : styles.dotAi}`} />
          {project.category}
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Projects = React.memo(function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const containerRef = useRef(null);

  // GSAP ScrollTrigger for project cards
  useGsapScrollTrigger(containerRef, `.${styles.projectCard}, .${styles.placeholderCard}`, {
    y: 40,
    stagger: 0.1,
    duration: 0.7,
  });

  const filtered = data.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>My Work</span>
          <h2 className={styles.heading}>Featured Projects</h2>
          <p className={styles.subheading}>
            A showcase of MERN stack applications and AI-powered solutions I've built
          </p>
        </div>

        {/* Filter tabs */}
        <div className={styles.filters} role="group" aria-label="Project filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
            >
              {f === 'MERN' && <span className={`${styles.filterDot} ${styles.dotMern}`} />}
              {f === 'Python/AI' && <span className={`${styles.filterDot} ${styles.dotAi}`} />}
              {f}
              <span className={styles.filterCount}>
                {f === 'All' ? data.length : data.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>More projects coming soon! Stay tuned.</p>
          <a
            href="https://github.com/SagarBhale"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
});

export default Projects;
