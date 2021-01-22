import { Resolver, Mutation, Arg } from 'type-graphql';
import { Order } from '../../../entity/Order';
import { CreateOrderInput } from '../shared/order.input';
import { createOrderSchema } from '../shared/order.validate';
import { OrderService } from '../../../service/order.service';
import { Inject } from 'typedi';
import { formatErrors } from '../../../utils/formatErrors';
import { OrderResponse } from '../shared/order.response';

@Resolver(Order)
export class CreateOrderResolver {
  @Inject(() => OrderService)
  orderService: OrderService;

  @Mutation(() => OrderResponse)
  async createOrder(
    @Arg('input')
    args: CreateOrderInput
  ): Promise<OrderResponse> {
    try {
      await createOrderSchema.validate(args, { abortEarly: false });
    } catch (error) {
      return { errors: formatErrors(error) };
    }

    const order = await this.orderService.create(args);

    return { order };
  }
}
