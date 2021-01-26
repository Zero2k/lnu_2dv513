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
  @Column('text')
  customerId: string;

  @Field()
  @Column('text')
  customerName: string;

  @Field()
  @Column('text')
  customerEmail: string;

  @Field()
  @Column({ type: 'bool', default: false })
  completed: boolean;

  /* Used to query orders based on userId instead of JOIN via user relation */
  @Column({
    name: 'userId',
  })
  userId: number;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderRow, (orderRow) => orderRow.order)
  orderRows: OrderRow[];
}
