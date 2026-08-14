import React from 'react';
import classNames from 'classnames';
import styles from './TextArea.module.css';

const TextArea = React.memo(function TextArea({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  disabled = false,
  required = false,
  rows = 4,
  id: idProp,
  className = '',
  ...rest
}) {
  const id = idProp || name;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && ' *'}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={classNames(styles.textarea, error && styles.error, className)}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className={classNames(styles.helperText, styles.helperError)} role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
});

export default TextArea;
