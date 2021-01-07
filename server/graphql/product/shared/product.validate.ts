import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
  name: yup.string().min(3).max(255),
  description: yup.string().min(3).max(255),
  img_url: yup.string().min(3).max(255),
  art: yup.number(),
});
