import { Service } from 'typedi';
import { User } from '../entity/User';
import { Order } from '../entity/Order';
import { CreateOrderInput } from '../graphql/order/shared/order.input';
import { Product } from '../entity/Product';
import { OrderRow } from '../entity/OrderRow';

@Service()
export class OrderService {
  async create(input: CreateOrderInput): Promise<Order> {
    const user = await User.findOne({ id: input.userId });
    const products = await Product.findByIds(input.productIds);

    const order = await Order.create({
      total: 0,
      customerId: input.customerId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      user,
    }).save();

    const quantity = 1;
    products.forEach(async (product) => {
      order.total += product.price * quantity;

      await OrderRow.create({
        amount: product.price,
        product,
        order,
      }).save();
    });

    const completeOrder = await order.save();

    return completeOrder;
  }
}
