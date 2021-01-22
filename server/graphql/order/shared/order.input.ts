import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [Int])
  productIds: number[];

  @Field(() => Int)
  customerId: number;

  @Field(() => String)
  customerName: string;

  @Field(() => String)
  customerEmail: string;
}
