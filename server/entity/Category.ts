import { Entity, Column, BeforeInsert } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import slugify from 'slugify';
import { Meta } from './Meta';

@ObjectType()
@Entity()
export class Category extends Meta {
  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column('text', { nullable: true })
  slug: string;

  @BeforeInsert()
  async createSlug() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
