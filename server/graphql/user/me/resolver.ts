import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { User } from '../../../entity/User';
import { UserService } from '../../../service/user.service';
import { Inject } from 'typedi';
import { MyContext } from 'server/types/context';

@Resolver(User)
export class ProfileResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Authorized()
  @Query(() => User)
  async me(@Ctx() { session }: MyContext): Promise<User> {
    const user = await this.userService.findById(session.userId!);

    return user;
  }
}
