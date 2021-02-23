import { Service } from 'typedi';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';
import { CreateCategoryInput } from '../graphql/category/shared/category.input';
import { getConnection } from 'typeorm';

@Service()
export class CategoryService {
  /* Used to test / create category via GraphQL Playground (Not used in the app itself) */
  async create(input: CreateCategoryInput): Promise<Category> {
    const categoryData = await Category.create(input).save();

    return categoryData;
  }

  async findById(id: number): Promise<Category | undefined> {
    /* const category = await Category.findOne({
      where: { id },
    });

    return category; */
    const category = await getConnection().query(
      `SELECT c FROM category WHERE c.id = $1`,
      [id]
    );

    return category;
  }

  async findAll(): Promise<Category[]> {
    /* const categories = await Category.find(); */

    const categories = await getConnection().query(`SELECT * FROM category;`);

    return categories;
  }

  async findProducts(id: number): Promise<Product[]> {
    /* const category = await Category.findOne({
      where: { id },
      relations: ['products'],
    });

    return category; */
    const products = await getConnection().query(
      `SELECT product.* FROM category LEFT JOIN product ON product."categoryId" = category.id WHERE category.id = $1`,
      [id]
    );

    return products;
  }
}
