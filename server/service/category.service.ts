import { Service } from 'typedi';
import { Category } from '../entity/Category';
import { CreateCategoryInput } from '../graphql/category/shared/category.input';

@Service()
export class CategoryService {
  async create(input: CreateCategoryInput): Promise<Category> {
    const categoryData = await Category.create(input).save();

    return categoryData;
  }

  async findById(id: number): Promise<Category | undefined> {
    const category = await Category.findOne({
      where: { id },
    });

    return category;
  }
}
