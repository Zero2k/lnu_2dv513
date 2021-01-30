import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';

@Resolver(User)
export class FindUserResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => [User])
  async findUsersByProduct(
    @Arg('productId', () => Int) productId: number
  ): Promise<User[]> {
    const users = await this.userService.findByProductId(productId);

    return users;
  }
}
