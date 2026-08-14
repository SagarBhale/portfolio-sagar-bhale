import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

const variantMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  icon: styles.icon,
};

const sizeMap = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const Button = React.memo(function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  component: Component = 'button',
  ...rest
}) {
  const isIcon = variant === 'icon';
  const sizeClass = isIcon ? styles.icon : sizeMap[size] || sizeMap.medium;

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      className={classNames(
        styles.root,
        variantMap[variant] || styles.primary,
        sizeClass,
        fullWidth && styles.fullWidth,
        className
      )}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Button;
