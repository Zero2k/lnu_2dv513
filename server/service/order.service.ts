import { Service } from 'typedi';
import { User } from '../entity/User';
import { Order } from '../entity/Order';
import { CreateOrderInput } from '../graphql/order/shared/order.input';
import { Product } from '../entity/Product';
import { OrderRow } from '../entity/OrderRow';
import { getConnection } from 'typeorm';

@Service()
export class OrderService {
  /* TODO:UPDATE WITH SQL */
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
        quantity,
        amount: product.price,
        product,
        order,
      }).save();
    });

    const completeOrder = await order.save();

    return completeOrder;
  }

  async findAllByUserId(id: number): Promise<Order[]> {
    /* const orders = await Order.find({
      where: {
        userId: id,
      },
    });

    return orders; */
    const orders = await getConnection().query(
      `SELECT "order".* FROM "order" WHERE "order"."userId" = $1`,
      [id]
    );

    return orders;
  }

  async findByCustomerId(
    resellerId: number,
    customerId: string
  ): Promise<Order> {
    /* const order = await Order.findOne({
      where: { userId: resellerId, customerId },
    });

    return order; */
    const order = await getConnection().query(
      `SELECT "order".* FROM "order" WHERE "order"."userId" = $1 AND "order"."customerId" = $2`,
      [resellerId, customerId]
    );

    return order[0];
  }

  async findById(id: number, userId: number): Promise<Order> {
    /* const order = await Order.findOne({ where: { id, userId } });

    return order; */
    const order = await getConnection().query(
      `SELECT "order".* FROM "order" WHERE "order"."id" = $1 AND "order"."userId" = $2`,
      [id, userId]
    );

    return order[0];
  }

  async toggleComplete(id: number, status: boolean): Promise<Order> {
    const order = await getConnection().query(
      `UPDATE "order" SET completed = $2 WHERE "order"."id" = $1 RETURNING *`,
      [id, status]
    );

    return order[0][0];
  }
}
