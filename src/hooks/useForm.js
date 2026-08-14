import { useState, useCallback } from 'react';

export function useForm(initialValues = {}, validate = () => ({})) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitCount, setSubmitCount] = useState(0);

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target ?? {};
      if (name != null) setValue(name, value);
    },
    [setValue]
  );

  const handleBlur = useCallback((e) => {
    const name = e.target?.name;
    if (name) setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const runValidation = useCallback(() => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(
    (onSubmit) => (e) => {
      e?.preventDefault?.();
      setSubmitCount((c) => c + 1);
      setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
      const valid = runValidation();
      if (valid && typeof onSubmit === 'function') onSubmit(values);
    },
    [values, runValidation]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitCount(0);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    submitCount,
    setValue,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    runValidation,
  };
}
