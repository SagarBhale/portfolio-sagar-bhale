import React from 'react';
import classNames from 'classnames';
import styles from './Container.module.css';

const Container = React.memo(function Container({
  children,
  className = '',
  maxWidth = 'default',
  component: Component = 'div',
  ...rest
}) {
  const widthClass =
    maxWidth === 'narrow' ? styles.narrow : maxWidth === 'wide' ? styles.wide : styles.root;

  return (
    <Component className={classNames(widthClass, className)} {...rest}>
      {children}
    </Component>
  );
});

export default Container;
