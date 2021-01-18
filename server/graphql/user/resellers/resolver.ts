import { Resolver, Query } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';

@Resolver(User)
export class ResellersResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => [User])
  async resellers(): Promise<User[]> {
    const users = await this.userService.findActiveResellers();

    return users;
  }
}
