import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.css';

const Modal = React.memo(function Modal({
  open = false,
  onClose,
  children,
  size = 'medium',
  className = '',
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      <div
        className={classNames(styles.paper, sizeClass, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
});

export default Modal;
