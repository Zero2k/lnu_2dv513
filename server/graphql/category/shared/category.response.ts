import { ObjectType, Field } from 'type-graphql';
import { Category } from '../../../entity/Category';
import { Error } from '../../shared/shared.response';

@ObjectType()
export class CategoryResponse {
  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
