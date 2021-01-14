import { Resolver, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { User } from '../../../entity/User';
import { HandleProfile } from '../shared/user.input';
import { UserResponse } from '../shared/user.response';
import { UserService } from '../../../service/user.service';
import { MyContext } from '../../../types/context';
import { Inject } from 'typedi';
import { handleProfileSchema } from '../shared/user.validate';
import { formatErrors } from '../../../utils/formatErrors';

@Resolver(User)
export class HandleProfileResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Authorized()
  @Mutation(() => UserResponse)
  async handleProfile(
    @Ctx() { session }: MyContext,
    @Arg('input')
    args: HandleProfile
  ): Promise<UserResponse> {
    try {
      await handleProfileSchema.validate(args, { abortEarly: false });
    } catch (error) {
      return { errors: formatErrors(error) };
    }
    const userProfile = await this.userService.handleProfile(
      session.userId,
      args
    );

    return { user: userProfile };
  }
}
