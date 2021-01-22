import * as yup from 'yup';

export const createOrderSchema = yup.object().shape({
  userId: yup.number(),
});
