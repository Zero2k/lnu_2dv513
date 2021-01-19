import { Resolver, Query } from 'type-graphql';
import { Inject } from 'typedi';
import { Product } from '../../../entity/Product';
import { ProductService } from '../../../service/product.service';

@Resolver(Product)
export class FindProductResolver {
  @Inject(() => ProductService)
  productService: ProductService;

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await this.productService.findAll();

    return products;
  }
}
