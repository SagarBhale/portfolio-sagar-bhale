import React from 'react';
import classNames from 'classnames';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './AnimatedWrapper.module.css';

const AnimatedWrapper = React.memo(function AnimatedWrapper({
  children,
  animation = 'slideUp',
  delay = 0,
  className = '',
  component: Component = 'div',
  ...rest
}) {
  const [ref, hasIntersected] = useIntersectionObserver({ threshold: 0.05 });
  const animationClass =
    animation === 'fadeOnly' ? styles.fadeOnly : animation === 'slideUp' ? styles.slideUp : styles.root;

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Component
      ref={ref}
      className={classNames(
        animationClass,
        hasIntersected && styles.visible,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default AnimatedWrapper;
