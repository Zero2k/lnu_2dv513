import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { Product } from '../../../entity/Product';
import { Category } from '../../../entity/Category';
import { CategoryService } from '../../../service/category.service';

@Resolver(Category)
export class CategoryResolver {
  @Inject(() => CategoryService)
  categoryService: CategoryService;

  @FieldResolver(() => [Product], { nullable: true })
  async products(@Root() rootCategory: Category): Promise<Product[]> {
    const category = await this.categoryService.findProducts(rootCategory.id);

    return category.products;
  }
}
