import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class AddProductsInput {
  @Field(() => [Int])
  productIds: number[];
}
