import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { Inject } from 'typedi';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';
import { MyContext } from '../../../types/context';

@Resolver(Order)
export class FindResellerOrdersResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Authorized()
  @Query(() => [Order])
  async resellerOrders(@Ctx() { session }: MyContext): Promise<Order[]> {
    const orders = await this.orderService.findAllByUserId(session.userId);

    return orders;
  }
}
