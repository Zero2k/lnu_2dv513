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

  async findAll(): Promise<Category[]> {
    const categories = await Category.find();

    return categories;
  }

  async findProducts(id: number): Promise<Category> {
    const category = await Category.findOne({
      where: { id },
      relations: ['products'],
    });

    return category;
  }
}
