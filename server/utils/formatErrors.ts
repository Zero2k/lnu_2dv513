import { ValidationError } from 'yup';

interface Errors {
  path?: string;
  message?: string;
}

export const formatErrors = (error: ValidationError) => {
  const errors: Errors[] = [];

  error.inner.forEach((e) => {
    errors.push({
      path: e.path,
      message: e.errors[0],
    });
  });

  return errors;
};
