import { Resolver, Arg, Int, Ctx, Mutation } from 'type-graphql';
import { Inject } from 'typedi';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';
import { MyContext } from '../../../types/context';

@Resolver(Order)
export class CompleteOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Mutation(() => Order)
  async completeOrder(
    @Ctx() { session }: MyContext,
    @Arg('orderId', () => Int) orderId: number
  ): Promise<Order> {
    /* User session.userId to only allow orders to be completed by a logged in reseller / user */
    const order = await this.orderService.findById(orderId, session.userId);

    const updatedOrder = await this.orderService.toggleComplete(
      order.id,
      !order.completed
    );

    return updatedOrder;
  }
}
