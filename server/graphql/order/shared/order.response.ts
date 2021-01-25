import { ObjectType, Field } from 'type-graphql';
import { Order } from '../../../entity/Order';
import { Error } from '../../shared/shared.response';

@ObjectType()
export class OrderResponse {
  @Field(() => Order, { nullable: true })
  order?: Order;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
