import { Resolver, Query } from 'type-graphql';
import { Inject } from 'typedi';
import { Category } from '../../../entity/Category';
import { CategoryService } from '../../../service/category.service';

@Resolver(Category)
export class CategoryResolver {
  @Inject(() => CategoryService)
  categoryService: CategoryService;

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    const categories = await this.categoryService.findAll();

    return categories;
  }
}
