import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  img_url: string;

  @Field()
  art: number;
}
