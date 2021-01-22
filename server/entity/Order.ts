import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';
import { User } from './User';
import { OrderRow } from './OrderRow';

@ObjectType()
@Entity()
export class Order extends Meta {
  @Field()
  @Column('float')
  total: number;

  @Field()
  @Column('int')
  customerId: number;

  @Field()
  @Column('text')
  customerName: string;

  @Field()
  @Column('text')
  customerEmail: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => OrderRow, (orderRow) => orderRow.order)
  orderRows: OrderRow[];
}
