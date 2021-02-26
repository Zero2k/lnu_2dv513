import { getManager, getConnection } from 'typeorm';
import { Service } from 'typedi';
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';
import { CreateProductInput } from '../graphql/product/shared/product.input';

const entityManager = getManager();

@Service()
export class ProductService {
  async create(input: CreateProductInput): Promise<Product> {
    const productData = await Product.create(input).save();

    return productData;
  }

  async findById(id: number): Promise<Product> {
    /* const product = await Product.findOne({
      where: { id },
    });

    return product; */
    const product = await getConnection().query(
      `SELECT product.* FROM product WHERE product.id = $1`,
      [id]
    );

    return product[0];
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    /* const products = await Product.findByIds(ids);

    return products; */
    const products = await getConnection().query(
      `SELECT product.* FROM product WHERE product.id = ANY ($1)`,
      [ids]
    );

    return products;
  }

  async findAll(): Promise<Product[]> {
    /* const products = await Product.find();

    return products; */
    const products = await getConnection().query(
      `SELECT product.* FROM product`
    );

    return products;
  }

  async findByCategory(category: string): Promise<Product[]> {
    const products = await entityManager
      .getRepository(Product)
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .where('category.slug = :category', { category })
      .getMany();

    return products;
  }

  async findCategory(id: number): Promise<Category> {
    const product = await Product.findOne({
      where: { id },
      relations: ['category'],
    });

    return product.category;
  }
}
