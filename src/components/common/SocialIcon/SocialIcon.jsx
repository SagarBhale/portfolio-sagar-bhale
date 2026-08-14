import React from 'react';
import classNames from 'classnames';
import styles from './SocialIcon.module.css';

const SocialIcon = React.memo(function SocialIcon({
  href,
  ariaLabel,
  icon: Icon,
  size = 'medium',
  className = '',
  ...rest
}) {
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : '';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(styles.link, sizeClass, className)}
      aria-label={ariaLabel}
      {...rest}
    >
      {Icon ? <Icon className={styles.icon} /> : null}
    </a>
  );
});

export default SocialIcon;
