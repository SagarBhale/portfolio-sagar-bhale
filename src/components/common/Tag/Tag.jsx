import React from 'react';
import classNames from 'classnames';
import styles from './Tag.module.css';

const Tag = React.memo(function Tag({
  children,
  variant = 'default',
  size = 'medium',
  className = '',
  component: Component = 'span',
  ...rest
}) {
  const variantClass =
    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : '';
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : '';

  return (
    <Component
      className={classNames(styles.root, variantClass, sizeClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Tag;
