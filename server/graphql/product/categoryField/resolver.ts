import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { Product } from '../../../entity/Product';
import { Category } from '../../../entity/Category';
import { ProductService } from '../../../service/product.service';

@Resolver(Product)
export class CategoryResolver {
  @Inject(() => ProductService)
  productService: ProductService;

  @FieldResolver(() => Category, { nullable: true })
  async category(@Root() rootProduct: Product): Promise<Category> {
    const product = await this.productService.findCategory(rootProduct.id);

    return product.category;
  }
}
