import { Resolver, Mutation, Arg } from 'type-graphql';
import { Category } from '../../../entity/Category';
import { CreateCategoryInput } from '../shared/category.input';
import { createCategorySchema } from '../shared/category.validate';
import { CategoryService } from '../../../service/category.service';
import { Inject } from 'typedi';
import { formatErrors } from '../../../utils/formatErrors';
import { CategoryResponse } from '../shared/category.response';

@Resolver(Category)
export class CreateProductResolver {
  @Inject(() => CategoryService)
  categoryService: CategoryService;

  @Mutation(() => CategoryResponse)
  async createCategory(
    @Arg('input')
    args: CreateCategoryInput
  ): Promise<CategoryResponse> {
    try {
      await createCategorySchema.validate(args, { abortEarly: false });
    } catch (error) {
      return { errors: formatErrors(error) };
    }

    const category = await this.categoryService.create(args);

    return { category };
  }
}
