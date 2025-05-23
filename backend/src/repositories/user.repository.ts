import { EntityManager, Repository } from 'typeorm';
import { User, UserEntity, UserEntityInterface } from '../entities/user.entity';
import { AppDataSource } from '../loader/database';

export type UpdateUser = Partial<Omit<UserEntity, 'id'>>;

export type UserRepositoryInterface = Repository<UserEntity> & {
  getOneByEmail(email: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  getOneById(id: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  getOneByUsername(username: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  getOneForAccount(id: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  updateUser(userId: string, user: UpdateUser, entityManager?: EntityManager): Promise<void>;
  createOne(user: User, entityManager?: EntityManager): Promise<User>;
  getAllStaff(): Promise<User[]>;
  getAllBlockedUsers(): Promise<User[]>;
};

export const UserRepository: UserRepositoryInterface = AppDataSource.getRepository(
  UserEntity,
).extend({
  getOneByEmail(email: string, withPassword?: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.email ILIKE :email', { email });

    if (withPassword) {
      query.addSelect('user.password');
    }

    const user = query.getOne();

    return user;
  },
  getOneById(id: string, withPassword?: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.id = :id', { id });

    if (withPassword) {
      query.addSelect('user.password');
    }

    const user = query.getOne();

    return user;
  },
  getOneByUsername(username: string, withPassword?: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.username ILIKE :username', {
      username,
    });

    if (withPassword) {
      query.addSelect('user.password');
    }

    const user = query.getOne();

    return user;
  },
  getOneForAccount(id: string, withPassword?: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.cars', 'cars', 'cars.isDeleted = false')
      .where('user.id = :id', { id });

    if (withPassword) {
      query.addSelect('user.password');
    }

    const user = query.getOne();

    return user;
  },
  async updateUser(userId: string, user: UpdateUser, entityManager?: EntityManager): Promise<void> {
    const manager = entityManager ?? this.manager;
    await manager
      .createQueryBuilder(UserEntity, 'user')
      .update()
      .set(user)
      .where({ id: userId })
      .execute();
  },
  async createOne(user: User, entityManager?: EntityManager): Promise<User> {
    const manager = entityManager ?? this.manager;
    const newUser = this.create(user);
    await manager.save(newUser);
    return newUser;
  },
  async getAllStaff(): Promise<User[]> {
    const users = await this.createQueryBuilder('user')
      .where('user.isStaff = :isStaff', { isStaff: true })
      .orderBy('user.isBlocked', 'ASC')
      .addOrderBy('user.username', 'ASC')
      .getMany();
    return users;
  },
  async getAllBlockedUsers(): Promise<User[]> {
    const users = await this.createQueryBuilder('user')
      .where('user.isBlocked = :isBlocked', { isBlocked: true })
      .andWhere('user.isStaff = :isStaff', { isStaff: false })
      .orderBy('user.username', 'ASC')
      .getMany();
    return users;
  },
});
