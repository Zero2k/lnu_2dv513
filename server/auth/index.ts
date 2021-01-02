import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types/context';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../entity/User';

export const authChecker: AuthChecker<MyContext> = async ({
  context,
}): Promise<boolean> => {
  const userId = context.session.userId;

  if (!userId) {
    throw new AuthenticationError('Not Authenticated');
  }

  try {
    await User.findOne({ where: { id: userId } });

    return true;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};
