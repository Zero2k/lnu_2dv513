import { Service } from 'typedi';
import { Product } from '../entity/Product';
import { CreateProductInput } from '../graphql/product/shared/product.input';

@Service()
export class ProductService {
  async create(input: CreateProductInput): Promise<Product> {
    const productData = await Product.create(input).save();

    return productData;
  }

  async findById(id: number): Promise<Product | undefined> {
    const product = await Product.findOne({
      where: { id },
      relations: ['category'],
    });

    return product;
  }
}
