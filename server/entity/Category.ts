import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';

@ObjectType()
@Entity()
export class Category extends Meta {
  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column('text')
  slug: string;
}
