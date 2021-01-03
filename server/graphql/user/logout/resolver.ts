import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../../../types/context';
import { User } from '../../../entity/User';
import { clearUserSessions } from '../../../utils/sessions';

@Resolver(User)
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { res, session, redis }: MyContext): Promise<Boolean> {
    if (session.userId) {
      await clearUserSessions(session.userId, redis);
      session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });
      res.clearCookie('qid');
      return true;
    }

    return false;
  }
}
