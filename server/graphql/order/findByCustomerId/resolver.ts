import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';

@Resolver(Order)
export class FindCustomerOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Query(() => Order, { nullable: true })
  async findCustomerOrder(
    @Arg('resellerId', () => Int) resellerId: number,
    @Arg('customerId', () => String) customerId: string
  ): Promise<Order | null> {
    /* Require resellerId to prevent people from searching by just knowing someone's phone number */
    const order = await this.orderService.findByCustomerId(
      resellerId,
      customerId
    );

    return order;
  }
}
