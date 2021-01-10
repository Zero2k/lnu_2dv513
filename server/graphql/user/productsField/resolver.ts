import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { Product } from '../../../entity/Product';
import { UserService } from '../../../service/user.service';

@Resolver(User)
export class ProductsResolver {
  @Inject(() => UserService)
  userService: UserService;

  @FieldResolver(() => [Product], { nullable: true })
  async products(@Root() rootUser: User): Promise<Product[]> {
    const user = await this.userService.findProducts(rootUser.id);

    return user.products;
  }
}
