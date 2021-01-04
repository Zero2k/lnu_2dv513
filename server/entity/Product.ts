import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';

@ObjectType()
@Entity()
export class Product extends Meta {
  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('text', { nullable: true })
  img_url: string | null;

  @Field()
  @Column('int', { nullable: true })
  art: number | null;
}
