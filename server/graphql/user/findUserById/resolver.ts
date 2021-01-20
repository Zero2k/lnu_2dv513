import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';

@Resolver(User)
export class FindUserResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => User)
  async findUserById(@Arg('userId', () => Int) userId: number): Promise<User> {
    const user = await this.userService.findById(userId);

    return user;
  }
}
