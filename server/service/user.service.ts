import { Service } from 'typedi';
import { User } from '../entity/User';
import { Product } from '../entity/Product';
import { AuthInput, HandleProfile } from '../graphql/user/shared/user.input';
import { /* IsNull, Not, */ /* getManager, */ getConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import { Order } from 'server/entity/Order';

/* const entityManager = getManager(); */

@Service()
export class UserService {
  async create(input: AuthInput): Promise<User> {
    /* const userData = await User.create(input).save();

    return userData; */
    const hashPassword = await hash(input.password, 10);
    const userData = await getConnection().query(
      `INSERT INTO "user" ("email", "password") VALUES ($1, $2) RETURNING *`,
      [input.email, hashPassword]
    );

    return userData[0];
  }

  async handleProfile(id: number, input: HandleProfile): Promise<User> {
    const userData = await this.findById(id);

    /* userData.name = !input.name ? userData.name : input.name;
    userData.phone = !input.phone ? userData.phone : input.phone;
    userData.address = !input.address ? userData.address : input.address;
    userData.zip = !input.zip ? userData.zip : input.zip;
    userData.city = !input.city ? userData.city : input.city;

    const updateUser = await userData.save();

    return updateUser; */
    const name = !input.name ? userData.name : input.name;
    const phone = !input.phone ? userData.phone : input.phone;
    const address = !input.address ? userData.address : input.address;
    const zip = !input.zip ? userData.zip : input.zip;
    const city = !input.city ? userData.city : input.city;
    const updateUser = await getConnection().query(
      `UPDATE "user" 
      SET "name" = $1, "phone" = $2, "address" = $3, "zip" = $4, "city" = $5 
      WHERE "user"."id" = $6 RETURNING *`,
      [name, phone, address, zip, city, id]
    );

    return updateUser[0][0];
  }

  async login(input: AuthInput): Promise<User | undefined> {
    const userData = await this.findByEmail(input.email);

    return userData;
  }

  /* TODO:UPDATE WITH SQL */
  async handleProducts(
    id: number,
    products: Product[],
    deleteAction: boolean
  ): Promise<Product[]> {
    const user = await this.findById(id);
    /* const userData = await User.findOne(id);

    if (!userData.active) {
      userData.active = true;
    }
    userData.products = products;
    userData.save();

    return userData; */

    /* if (!user.active) {
      TODO:SET USER TO ACTIVE
    } */

    const ids = products.map((product) => product.id);
    if (deleteAction) {
      await getConnection().query(
        `DELETE FROM "user_products_product" WHERE "user_products_product"."userId" = $2 AND NOT "user_products_product"."productId" = ANY ($1)`,
        [ids, user.id]
      );
    } else {
      products.forEach(async (product) => {
        await getConnection().query(
          `INSERT INTO "user_products_product" ("productId", "userId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
          [product.id, user.id]
        );
      });
    }

    const productsData = await getConnection().query(
      `SELECT product.* FROM "user_products_product" LEFT JOIN product ON "user_products_product"."productId" = product.id WHERE "user_products_product"."userId" = $1`,
      [user.id]
    );

    return productsData;
  }

  async findOne(): Promise<User | undefined> {
    /* const userData = await User.findOne();

    return userData; */
    const userData = await getConnection().query(
      `SELECT "user".* FROM "user" LIMIT 1`
    );

    return userData;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const lowerCaseEmail = email.toLowerCase().trim();
    /* const user = await User.findOne({
      where: { email: lowerCaseEmail },
    });

    return user; */
    const user = await getConnection().query(
      `SELECT "user".* FROM "user" WHERE "user"."email" = $1`,
      [lowerCaseEmail]
    );

    return user[0];
  }

  async findById(id: number): Promise<User | undefined> {
    /* const user = await User.findOne({
      where: { id },
    });

    return user; */
    const user = await getConnection().query(
      `SELECT "user".* FROM "user" WHERE "user"."id" = $1`,
      [id]
    );

    return user[0];
  }

  async findProducts(id: number): Promise<Product[]> {
    /* const user = await User.findOne({
      where: { id },
      relations: ['products'],
    });

    return user; */
    const products = await getConnection().query(
      `SELECT product.* FROM "user_products_product" LEFT JOIN product ON "user_products_product"."productId" = product.id WHERE "user_products_product"."userId" = $1`,
      [id]
    );

    return products;
  }

  async findByProductId(id: number): Promise<User[]> {
    /* const users = await entityManager
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.products', 'products')
      .where('products.id = :id', { id })
      .getMany();

    return users; */
    const users = await getConnection().query(
      `SELECT "user".* FROM "user" INNER JOIN user_products_product ON "user_products_product"."userId" = "user"."id" WHERE 
      "user_products_product"."productId" = $1`,
      [id]
    );

    return users;
  }

  async findOrders(id: number): Promise<Order[] | undefined> {
    /* const user = await User.findOne({
      where: { id },
      relations: ['orders'],
    });

    return user; */
    const orders = await getConnection().query(
      `SELECT "order".* FROM "user" LEFT JOIN "order" ON "order"."userId" = "user"."id" WHERE "user"."id" = $1`,
      [id]
    );

    return orders;
  }

  async findActiveResellers(): Promise<User[]> {
    /* const users = await User.find({
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

    return users; */
    const users = await getConnection().query(
      `SELECT "user".* FROM "user" 
        WHERE "user"."name" IS NOT NULL 
        AND "user"."phone" IS NOT NULL 
        AND "user"."address" IS NOT NULL 
        AND "user"."zip" IS NOT NULL 
        AND "user"."city" IS NOT NULL 
        AND "user"."active" = TRUE 
        ORDER BY "user"."name" ASC;`
    );

    return users;
  }

  async checkActiveUserExists(input: { email: string }): Promise<Boolean> {
    /* const userData = await User.findOne({
      where: { email: input.email },
    });

    return userData ? true : false; */
    const lowerCaseEmail = input.email.toLowerCase().trim();
    const user = await getConnection().query(
      `SELECT "user".* FROM "user" WHERE "user"."email" = $1`,
      [lowerCaseEmail]
    );

    return user[0] ? true : false;
  }
}
