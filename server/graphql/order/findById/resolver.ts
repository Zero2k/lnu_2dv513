import { Resolver, Query, Arg, Int, Ctx } from 'type-graphql';
import { Inject } from 'typedi';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';
import { MyContext } from '../../../types/context';

@Resolver(Order)
export class FindOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Query(() => Order)
  async findOrderById(
    @Ctx() { session }: MyContext,
    @Arg('orderId', () => Int) orderId: number
  ): Promise<Order> {
    /* User session.userId to only query orders that belong to a logged in reseller / user */
    const order = await this.orderService.findById(orderId, session.userId);

    return order;
  }
}
