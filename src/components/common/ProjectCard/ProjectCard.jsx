import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './ProjectCard.module.css';

const ProjectCard = React.memo(function ProjectCard({
  title,
  description,
  image,
  imageAlt = '',
  tags = [],
  githubUrl,
  liveUrl,
  className = '',
  enableTilt = false,
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableTilt) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({ x: (y - 0.5) * 8, y: (x - 0.5) * 8 });
    },
    [enableTilt]
  );

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const tiltStyle = enableTilt
    ? { transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
    : undefined;

  return (
    <Card
      className={classNames(styles.card, enableTilt && styles.tilt, className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
    >
      <div className={styles.imageWrap}>
        <img
          src={image}
          alt={imageAlt || title}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} size="small">
                {tag}
              </Tag>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`View ${title} on GitHub`}>
              <GitHubIcon /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={`View live demo of ${title}`}>
              <OpenInNewIcon /> Demo
            </a>
          )}
        </div>
      </div>
    </Card>
  );
});

export default ProjectCard;
