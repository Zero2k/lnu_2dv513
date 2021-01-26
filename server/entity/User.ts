import { hash } from 'bcryptjs';
import {
  Entity,
  Column,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Meta } from './Meta';
import { Product } from './Product';
import { Role } from '../config/role';
import { Order } from './Order';

@ObjectType()
@Entity()
export class User extends Meta {
  @Field({ nullable: true })
  @Column('text', { nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  phone?: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  address?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  zip?: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  city?: string;

  @Column('text')
  password: string;

  @Column({ type: 'bool', default: false })
  active: boolean;

  @Column({ type: 'enum', enum: Object.values(Role), default: Role.User })
  role: string;

  @ManyToMany(() => Product, { onDelete: 'CASCADE' })
  @JoinTable()
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

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
