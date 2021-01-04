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

@ObjectType()
@Entity()
export class User extends Meta {
  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  resetPasswordToken: string | null;

  @Column('int', { nullable: true })
  resetPasswordExpires: number | null;

  @ManyToMany(() => Product)
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
