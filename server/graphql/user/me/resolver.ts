import { Resolver, Query } from 'type-graphql';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';
import { Inject } from 'typedi';

@Resolver(User)
export class ProfileResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => User)
  async me(): Promise<User> {
    return this.userService.findOne();
  }
}
