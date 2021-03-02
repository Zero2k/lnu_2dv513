import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../../../entity/User';
import { Order } from '../../../entity/Order';
import { UserService } from '../../../service/user.service';

@Resolver(User)
export class OrdersResolver {
  @Inject(() => UserService)
  userService: UserService;

  @FieldResolver(() => [Order], { nullable: true })
  async orders(@Root() rootUser: User): Promise<Order[]> {
    const orders = await this.userService.findOrders(rootUser.id);

    return orders;
  }
}
