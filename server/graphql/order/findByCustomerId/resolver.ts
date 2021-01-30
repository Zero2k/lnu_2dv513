import { Resolver, Query, Arg } from 'type-graphql';
import { Inject } from 'typedi';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';

@Resolver(Order)
export class FindCustomerOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Query(() => Order)
  async findCustomerOrder(
    @Arg('customerId', () => String) customerId: string
  ): Promise<Order> {
    const order = await this.orderService.findByCustomerId(customerId);

    return order;
  }
}
