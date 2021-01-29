import { Resolver, Query, Arg } from 'type-graphql';
import { Inject } from 'typedi';
import { Product } from '../../../entity/Product';
import { ProductService } from '../../../service/product.service';

@Resolver(Product)
export class FindProductResolver {
  @Inject(() => ProductService)
  productService: ProductService;

  @Query(() => [Product])
  async productsByCategory(
    @Arg('category', () => String) category: string
  ): Promise<Product[]> {
    const products = await this.productService.findByCategory(category);

    return products;
  }
}
