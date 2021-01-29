import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { Product } from '../../../entity/Product';
import { ProductService } from '../../../service/product.service';

@Resolver(Product)
export class FindProductResolver {
  @Inject(() => ProductService)
  productService: ProductService;

  @Query(() => Product)
  async product(
    @Arg('productId', () => Int) productId: number
  ): Promise<Product> {
    const product = await this.productService.findById(productId);

    return product;
  }
}
