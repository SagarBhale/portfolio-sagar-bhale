import React from 'react';
import classNames from 'classnames';
import styles from './SkillCard.module.css';

const SkillCard = React.memo(function SkillCard({
  title,
  level,
  icon: Icon,
  progress,
  className = '',
}) {
  const progressValue = typeof progress === 'number' ? Math.min(100, Math.max(0, progress)) : null;

  return (
    <div className={classNames(styles.root, className)}>
      {Icon && (
        <div className={styles.iconWrap} aria-hidden>
          <Icon />
        </div>
      )}
      <h4 className={styles.title}>{title}</h4>
      {level && <p className={styles.level}>{level}</p>}
      {progressValue != null && (
        <div className={styles.progressBar} role="progressbar" aria-valuenow={progressValue} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressFill} style={{ width: `${progressValue}%` }} />
        </div>
      )}
    </div>
  );
});

export default SkillCard;
