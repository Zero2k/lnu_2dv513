import { Service } from 'typedi';
import { User } from '../entity/User';
import { AuthInput } from '../graphql/user/shared/user.input';

@Service()
export class UserService {
  async create(input: AuthInput): Promise<User> {
    const userData = await User.create(input).save();

    return userData;
  }

  async findOne(): Promise<User | undefined> {
    const userData = await User.findOne();

    return userData;
  }

  async checkActiveUserExists(input: { email: string }): Promise<Boolean> {
    const userData = await User.findOne({
      where: { email: input.email },
    });

    return userData ? true : false;
  }
}
