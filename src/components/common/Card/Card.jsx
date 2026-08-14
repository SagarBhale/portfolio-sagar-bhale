import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';

const Card = React.memo(function Card({
  children,
  className = '',
  elevated = false,
  noHover = false,
  component: Component = 'div',
  ...rest
}) {
  return (
    <Component
      className={classNames(
        styles.root,
        elevated && styles.elevated,
        noHover && styles.noHover,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

export const CardContent = React.memo(function CardContent({ children, className = '' }) {
  return <div className={classNames(styles.content, className)}>{children}</div>;
});

export default Card;
