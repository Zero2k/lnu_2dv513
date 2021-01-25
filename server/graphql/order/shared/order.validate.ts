import * as yup from 'yup';

const validEmail = 'Email must be a valid email';
const emailLength = ({ min }: { min: number }) =>
  `Email must be at least ${min} characters`;

export const createOrderSchema = yup.object().shape({
  userId: yup.number(),
  productIds: yup.array(yup.number()),
  customerId: yup.string().min(5),
  customerName: yup.string().min(5),
  customerEmail: yup.string().min(5, emailLength).email(validEmail),
});
