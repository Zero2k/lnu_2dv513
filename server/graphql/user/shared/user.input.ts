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
  phone: string;

  @Field()
  address: string;

  @Field()
  zip: string;

  @Field()
  city: string;
}

@InputType()
export class HandleProductsInput {
  @Field(() => [Int])
  productIds: number[];

  @Field(() => Boolean)
  deleteAction: boolean;
}
