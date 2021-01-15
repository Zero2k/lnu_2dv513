import { Entity, Column, BeforeInsert, OneToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import slugify from 'slugify';
import { Meta } from './Meta';
import { Product } from './Product';

@ObjectType()
@Entity()
export class Category extends Meta {
  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column('text', { nullable: true })
  slug: string;

  @OneToMany(() => Product, (product) => product.category)
  @JoinTable()
  products: Product[];

  @BeforeInsert()
  async createSlug() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
