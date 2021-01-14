import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class HandleProfile {
  @Field()
  name: string;

  @Field()
  phone: number;

  @Field()
  address: string;

  @Field()
  zip: number;

  @Field()
  city: string;
}

@InputType()
export class HandleProductsInput {
  @Field(() => [Int])
  productIds: number[];
}
