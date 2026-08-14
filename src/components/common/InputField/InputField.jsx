import React from 'react';
import classNames from 'classnames';
import styles from './InputField.module.css';

const InputField = React.memo(function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  disabled = false,
  required = false,
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
      <input
        id={id}
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={classNames(styles.input, error && styles.error, className)}
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

export default InputField;
