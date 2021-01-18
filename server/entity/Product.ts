import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  BeforeInsert,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import slugify from 'slugify';
import { Meta } from './Meta';
import { Category } from './Category';
import { User } from './User';

@ObjectType()
@Entity()
export class Product extends Meta {
  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field()
  @Column('text', { nullable: true })
  slug: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('int', { nullable: true })
  art: number | null;

  @Field()
  @Column('text', { nullable: true })
  img_url: string | null;

  @Field()
  @Column('text', { nullable: true })
  video_preview: string | null;

  @Field()
  @Column('float', { nullable: true })
  price: number | null;

  @ManyToMany(() => User)
  user: User[];

  @ManyToOne(() => Category, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  category: Category;

  @BeforeInsert()
  async createSlug() {
    this.slug = slugify(this.name, {
      lower: true,
    });
  }
}
