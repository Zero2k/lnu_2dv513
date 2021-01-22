import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';
import { Product } from './Product';
import { Order } from './Order';

@ObjectType()
@Entity()
export class OrderRow extends Meta {
  @Field()
  @Column('float')
  amount: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
