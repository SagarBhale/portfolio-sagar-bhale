import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.css';

const variantMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  neutral: styles.neutral,
  success: styles.success,
};

const Badge = React.memo(function Badge({
  children,
  variant = 'primary',
  className = '',
  component: Component = 'span',
  ...rest
}) {
  return (
    <Component
      className={classNames(styles.root, variantMap[variant] || styles.primary, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Badge;
