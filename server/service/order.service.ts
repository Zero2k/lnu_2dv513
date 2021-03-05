import { Service } from 'typedi';
/* import { User } from '../entity/User'; */
import { Order } from '../entity/Order';
import { CreateOrderInput } from '../graphql/order/shared/order.input';
/* import { Product } from '../entity/Product'; */
/* import { OrderRow } from '../entity/OrderRow'; */
import { getConnection } from 'typeorm';

@Service()
export class OrderService {
  async create(input: CreateOrderInput): Promise<Order> {
    /* const user = await User.findOne({ id: input.userId });
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

    return completeOrder; */

    const user = await getConnection().query(
      `SELECT "user".* FROM "user" WHERE "user"."id" = $1`,
      [input.userId]
    );
    const products = await getConnection().query(
      `SELECT product.* FROM product WHERE product.id = ANY ($1)`,
      [input.productIds]
    );

    /* CREATE ORDER */
    const order = await getConnection().query(
      `INSERT INTO "order" ("total", "customerId", "customerName", "customerEmail", "userId") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [0, input.customerId, input.customerName, input.customerEmail, user[0].id]
    );

    /* CREATE ORDER_ROWS */
    const quantity = 1;
    let total = 0;
    products.forEach(async (product) => {
      total += product.price * quantity;
      await getConnection().query(
        `INSERT INTO "order_row" ("quantity", "amount", "productId", "orderId") VALUES ($1, $2, $3, $4)`,
        [quantity, product.price, product.id, order[0].id]
      );
    });

    /* RETURN COMPLETE ORDER */
    if (order) {
      const completeOrder = await getConnection().query(
        `UPDATE "order" SET total = $2 WHERE "order"."id" = $1 RETURNING *`,
        [order[0].id, total]
      );

      return completeOrder[0][0];
    }
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
