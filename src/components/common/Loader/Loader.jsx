import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css';

const Loader = React.memo(function Loader({
  size = 'medium',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}) {
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : '';

  return (
    <div className={classNames(styles.wrapper, sizeClass, className)} role="status" aria-label={ariaLabel}>
      <div className={styles.spinner} />
    </div>
  );
});

export default Loader;
