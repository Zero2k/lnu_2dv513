import { Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { Product } from '../../../entity/Product';
import { HandleProductCategoryInput } from '../shared/product.input';
import { ProductResponse } from '../shared/product.response';
import { CategoryService } from '../../../service/category.service';
import { ProductService } from '../../../service/product.service';
import { Inject } from 'typedi';

@Resolver(Product)
export class HandleProductCategoryResolver {
  @Inject(() => ProductService)
  productService: ProductService;
  @Inject(() => CategoryService)
  categoryService: CategoryService;

  @Authorized()
  @Mutation(() => ProductResponse)
  async handleProductCategory(
    @Arg('input')
    args: HandleProductCategoryInput
  ): Promise<ProductResponse> {
    const productsData = await this.productService.findById(args.productId);

    if (!productsData) {
      return {
        errors: [
          {
            path: 'productId',
            message: 'A product with that id does not exist',
          },
        ],
      };
    }

    const categoryData = await this.categoryService.findById(args.categoryId);

    if (!categoryData) {
      return {
        errors: [
          {
            path: 'categoryId',
            message: 'A category with that id does not exist',
          },
        ],
      };
    }

    productsData.category = categoryData;
    productsData.save();

    return { product: productsData };
  }
}
