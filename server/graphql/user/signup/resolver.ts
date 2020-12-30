import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../../entity/User';
import { AuthInput } from '../shared/user.input';
import { signUpSchema } from '../shared/user.validate';
import { UserService } from '../../../service/user.service';
import { Inject } from 'typedi';
import { UserResponse } from '../shared/user.response';
import { formatErrors } from '../../../utils/formatErrors';

@Resolver(User)
export class SignupResolver {
  @Inject(() => UserService)
  userService: UserService;

  @Mutation(() => UserResponse)
  async signUp(
    @Arg('input')
    args: AuthInput
  ): Promise<UserResponse> {
    try {
      await signUpSchema.validate(args, { abortEarly: false });
    } catch (error) {
      return { errors: formatErrors(error) };
    }

    const exists = await this.userService.checkActiveUserExists(args);

    if (exists) {
      return {
        errors: [
          {
            path: 'email',
            message: 'A user with that email already exists.',
          },
        ],
      };
    }

    const user = await this.userService.create(args);

    return { user };
  }
}
