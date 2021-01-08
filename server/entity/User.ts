import { hash } from 'bcryptjs';
import {
  Entity,
  Column,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';
import { Product } from './Product';
import { Role } from '../config/role';

@ObjectType()
@Entity()
export class User extends Meta {
  @Field()
  @Column('text', { nullable: true })
  name: string;

  @Field()
  @Column('int', { nullable: true })
  phone: number;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column('text', { nullable: true })
  address: string;

  @Field()
  @Column('int', { nullable: true })
  zip: number;

  @Field()
  @Column('text', { nullable: true })
  city: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: Object.values(Role), default: Role.User })
  role: string;

  @ManyToMany(() => Product, { onDelete: 'CASCADE' })
  @JoinTable()
  products: Product[];

  private tempPassword: string;

  @AfterLoad()
  loadTempPassword() {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.tempPassword !== this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }
}
