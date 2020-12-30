import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Error {
  @Field(() => String)
  path?: String;

  @Field(() => String)
  message?: String;
}
