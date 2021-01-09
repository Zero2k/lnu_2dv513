import * as yup from 'yup';

export const createCategorySchema = yup.object().shape({
  name: yup.string().min(3).max(255),
});
