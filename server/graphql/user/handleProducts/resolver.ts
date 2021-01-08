import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Product } from '../../../entity/Product';
import { HandleProductsInput } from '../shared/user.input';
import { HandleProductResponse } from '../shared/user.response';
import { UserService } from '../../../service/user.service';
import { ProductService } from '../../../service/product.service';
import { MyContext } from '../../../types/context';
import { Inject } from 'typedi';

@Resolver(Product)
export class HandleProductResolver {
  @Inject(() => UserService)
  userService: UserService;
  @Inject(() => ProductService)
  productService: ProductService;

  @Authorized()
  @Mutation(() => HandleProductResponse)
  async handleProducts(
    @Ctx() { session }: MyContext,
    @Arg('input')
    args: HandleProductsInput
  ): Promise<HandleProductResponse> {
    const productsData = await this.productService.findByIds(args.productIds);

    if (
      !productsData.length ||
      args.productIds.length !== productsData.length
    ) {
      return {
        errors: [
          {
            path: 'productsIds',
            message: 'One or more product ids does not exist',
          },
        ],
      };
    }

    const userProducts = await this.userService.handleProducts(
      session.userId,
      productsData
    );

    return { products: userProducts.products };
  }
}
