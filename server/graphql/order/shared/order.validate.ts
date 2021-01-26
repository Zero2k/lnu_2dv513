import * as yup from 'yup';

const validEmail = 'Email must be a valid email';
const emailLength = ({ min }: { min: number }) =>
  `Email must be at least ${min} characters`;
const nameLength = ({ min }: { min: number }) =>
  `Name must be at least ${min} characters`;
const phoneLength = ({ min }: { min: number }) =>
  `Phone number must be at least ${min} characters`;
const phoneRegExp = /^((\d{1,3})\s?)?((\(\d{3,5}\)|\d{3,5})(\s)?)\d{3,8}$/;

export const createOrderSchema = yup.object().shape({
  userId: yup.number(),
  productIds: yup.array(yup.number()),
  customerId: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(5, phoneLength),
  customerName: yup.string().min(5, nameLength),
  customerEmail: yup.string().min(5, emailLength).email(validEmail),
});
