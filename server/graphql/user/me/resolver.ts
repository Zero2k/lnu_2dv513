import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';
import { Inject } from 'typedi';
import { MyContext } from 'server/types/context';

@Resolver(User)
export class ProfileResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Query(() => User)
  async me(@Ctx() { session }: MyContext): Promise<User> {
    const user = await this.userService.findById(session.userId!);

    return user;
  }
}
