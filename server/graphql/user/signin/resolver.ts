import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { AuthInput } from '../shared/user.input';
import { UserResponse } from '../shared/user.response';
import { signInSchema } from '../shared/user.validate';
import { MyContext } from '../../../types/context';
import { UserService } from '../../../service/user.service';
import { comparePassword } from '../../../utils/password';

@Resolver(User)
export class SigninResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Mutation(() => UserResponse)
  async signIn(
    @Arg('input')
    args: AuthInput,
    @Ctx() { req, redis, session }: MyContext
  ): Promise<UserResponse> {
    try {
      await signInSchema.validate(args, { abortEarly: false });
    } catch (error) {
      throw error;
    }

    const user = await this.userService.login(args);

    if (!user) {
      return {
        errors: [
          {
            path: 'email',
            message: 'No user with that email exists.',
          },
        ],
      };
    }

    const isValidPassword = await comparePassword(
      args.password,
      user?.password
    );

    if (!isValidPassword) {
      return {
        errors: [
          {
            path: 'password',
            message: 'Ensure your credintials are valid.',
          },
        ],
      };
    }

    session.userId = user.id;
    if (req.sessionID) {
      await redis.lpush(`${'userSids'}${user.id}`, req.sessionID);
    }

    return {
      user,
    };
  }
}
