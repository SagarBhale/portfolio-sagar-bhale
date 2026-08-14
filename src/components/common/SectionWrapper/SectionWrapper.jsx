import React from 'react';
import classNames from 'classnames';
import styles from './SectionWrapper.module.css';

const SectionWrapper = React.memo(function SectionWrapper({
  children,
  id,
  className = '',
  component: Component = 'section',
  spacing = 'default',
  ...rest
}) {
  const spacingClass =
    spacing === 'narrow' ? styles.narrow : spacing === 'wide' ? styles.wide : styles.root;

  return (
    <Component
      id={id}
      className={classNames(spacingClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default SectionWrapper;
