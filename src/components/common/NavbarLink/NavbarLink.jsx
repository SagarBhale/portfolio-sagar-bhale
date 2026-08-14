import React from 'react';
import classNames from 'classnames';
import styles from './NavbarLink.module.css';

const NavbarLink = React.memo(function NavbarLink({
  href,
  label,
  isActive = false,
  onClick,
  className = '',
}) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(href);
    }
  };

  return (
    <a
      href={href}
      className={classNames(styles.link, isActive && styles.active, className)}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </a>
  );
});

export default NavbarLink;
