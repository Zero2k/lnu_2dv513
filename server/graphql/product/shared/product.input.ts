import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  img_url: string;

  @Field(() => Int)
  art: number;

  @Field(() => Int)
  price: number;
}

@InputType()
export class HandleProductCategoryInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  categoryId: number;
}
