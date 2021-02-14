import { ValidationError } from 'yup';

interface ValidationErrorsResult {
  [key: string]: string;
}

export default function getValidationErrors(
  error: ValidationError
): ValidationErrorsResult {
  const validationErrors: ValidationErrorsResult = {};

  error.inner.forEach(err => {
    if (err.path) validationErrors[err.path] = err.message;
  });

  return validationErrors;
}
