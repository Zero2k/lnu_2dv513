import { ObjectType, Field } from 'type-graphql';
import { Product } from '../../../entity/Product';
import { Error } from '../../shared/shared.response';

@ObjectType()
export class ProductResponse {
  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
