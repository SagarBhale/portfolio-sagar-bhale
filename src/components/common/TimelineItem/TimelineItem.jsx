import React from 'react';
import classNames from 'classnames';
import styles from './TimelineItem.module.css';

const TimelineItem = React.memo(function TimelineItem({
  role,
  company,
  duration,
  achievements = [],
  className = '',
}) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.dot} aria-hidden />
      <div className={styles.content}>
        <h4 className={styles.role}>{role}</h4>
        <p className={styles.company}>{company}</p>
        <p className={styles.duration}>{duration}</p>
        {achievements.length > 0 && (
          <ul className={styles.achievements}>
            {achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default TimelineItem;
