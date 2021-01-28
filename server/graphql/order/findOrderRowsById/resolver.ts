import { Resolver, Query, Arg, Int, Authorized } from 'type-graphql';
import { getManager } from 'typeorm';
import { Inject } from 'typedi';
import { OrderService } from '../../../service/order.service';
import { OrderView } from '../../../entity/OrderView';

const entityManager = getManager();

@Resolver(OrderView)
export class FindOrderRowsResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Authorized()
  @Query(() => [OrderView])
  async findOrderRowsById(
    @Arg('orderId', () => Int) orderId: number
  ): Promise<OrderView[]> {
    const orderRows = await entityManager.find(OrderView, {
      id: orderId,
    });

    return orderRows;
  }
}
