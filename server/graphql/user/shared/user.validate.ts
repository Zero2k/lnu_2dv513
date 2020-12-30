import * as yup from 'yup';

const validEmail = 'Email must be a valid email';
const usernameLength = ({ min }: { min: number }) =>
  `Username must be at least ${min} characters`;
const emailLength = ({ min }: { min: number }) =>
  `Email must be at least ${min} characters`;
const passwordLength = ({ min }: { min: number }) =>
  `Password must be at least ${min} characters`;

export const signUpSchema = yup.object().shape({
  username: yup.string().min(3, usernameLength).max(255),
  email: yup.string().min(5, emailLength).max(255).email(validEmail),
  password: yup.string().min(5, passwordLength).max(255),
});
