import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [Int])
  productIds: number[];

  @Field()
  customerId: string;

  @Field()
  customerName: string;

  @Field()
  customerEmail: string;
}
