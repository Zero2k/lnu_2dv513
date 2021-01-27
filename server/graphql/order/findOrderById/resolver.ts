import { Resolver, Query, Arg, Int } from 'type-graphql';
import { getManager } from 'typeorm';
import { Inject } from 'typedi';
import { OrderService } from '../../../service/order.service';
import { OrderView } from '../../../entity/OrderView';

const entityManager = getManager();

@Resolver(OrderView)
export class FindOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Query(() => [OrderView])
  async findOrderById(
    @Arg('orderId', () => Int) orderId: number
  ): Promise<OrderView[]> {
    const order = await entityManager.find(OrderView, {
      id: orderId,
    });

    return order;
  }
}
