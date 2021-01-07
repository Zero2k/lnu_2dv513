import { Resolver, Mutation, Arg } from 'type-graphql';
import { Product } from '../../../entity/Product';
import { CreateProductInput } from '../shared/product.input';
import { createProductSchema } from '../shared/product.validate';
import { ProductService } from '../../../service/product.service';
import { Inject } from 'typedi';
import { formatErrors } from '../../../utils/formatErrors';
import { ProductResponse } from '../shared/product.response';

@Resolver(Product)
export class CreateProductResolver {
  @Inject(() => ProductService)
  productService: ProductService;

  @Mutation(() => ProductResponse)
  async createProduct(
    @Arg('input')
    args: CreateProductInput
  ): Promise<ProductResponse> {
    try {
      await createProductSchema.validate(args, { abortEarly: false });
    } catch (error) {
      return { errors: formatErrors(error) };
    }

    const product = await this.productService.create(args);

    return { product };
  }
}
