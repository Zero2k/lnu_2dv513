import { Service } from 'typedi';
import { User } from '../entity/User';
import { Product } from '../entity/Product';
import { AuthInput, HandleProfile } from '../graphql/user/shared/user.input';
import { IsNull, Not } from 'typeorm';

@Service()
export class UserService {
  async create(input: AuthInput): Promise<User> {
    const userData = await User.create(input).save();

    return userData;
  }

  async handleProfile(id: number, input: HandleProfile): Promise<User> {
    const userData = await this.findById(id);

    userData.name = !input.name ? userData.name : input.name;
    userData.phone = !input.phone ? userData.phone : input.phone;
    userData.address = !input.address ? userData.address : input.address;
    userData.zip = !input.zip ? userData.zip : input.zip;
    userData.city = !input.city ? userData.city : input.city;

    const updateUser = await userData.save();

    return updateUser;
  }

  async login(input: AuthInput): Promise<User | undefined> {
    const userData = await this.findByEmail(input.email);

    return userData;
  }

  async handleProducts(
    id: number,
    products: Product[]
  ): Promise<User | undefined> {
    const userData = await this.findById(id);

    if (!userData.active) {
      userData.active = true;
    }
    userData.products = products;
    userData.save();

    return userData;
  }

  async findOne(): Promise<User | undefined> {
    const userData = await User.findOne();

    return userData;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const lowerCaseEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      where: { email: lowerCaseEmail },
    });

    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id },
    });

    return user;
  }

  async findProducts(id: number): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id },
      relations: ['products'],
    });

    return user;
  }

  async findOrders(id: number): Promise<User | undefined> {
    const user = await User.findOne({
      where: { id },
      relations: ['orders'],
    });

    return user;
  }

  async findActiveResellers(): Promise<User[]> {
    const users = await User.find({
      where: {
        name: Not(IsNull()),
        phone: Not(IsNull()),
        address: Not(IsNull()),
        zip: Not(IsNull()),
        city: Not(IsNull()),
        active: true,
      },
      order: { name: 'ASC' },
    });

    return users;
  }

  async checkActiveUserExists(input: { email: string }): Promise<Boolean> {
    const userData = await User.findOne({
      where: { email: input.email },
    });

    return userData ? true : false;
  }
}
