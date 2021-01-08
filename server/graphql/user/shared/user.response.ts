import { ObjectType, Field } from 'type-graphql';
import { User } from '../../../entity/User';
import { Product } from '../../../entity/Product';
import { Error } from '../../shared/shared.response';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@ObjectType()
export class HandleProductResponse {
  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
