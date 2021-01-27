import { ViewEntity, ViewColumn, Connection } from 'typeorm';
import { Order } from './Order';
import { OrderRow } from './OrderRow';
import { Field, ObjectType } from 'type-graphql';
import { Product } from './Product';

@ObjectType()
@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('order.id', 'id')
      .addSelect('product.name', 'productName')
      .addSelect('product.price', 'price')
      .addSelect('order_row.amount', 'cost')
      .from(Order, 'order')
      .leftJoin(OrderRow, 'order_row', 'order_row.orderId = order.id')
      .leftJoin(Product, 'product', 'order_row.productId = product.id'),
})
export class OrderView {
  @Field()
  @ViewColumn()
  id: number;

  @Field()
  @ViewColumn()
  productName: string;

  @Field()
  @ViewColumn()
  price: number;

  @Field()
  @ViewColumn()
  cost: number;
}
