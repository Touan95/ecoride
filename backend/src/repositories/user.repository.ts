import { Repository } from 'typeorm';
import { User, UserEntity, UserEntityInterface } from '../entities/user.entity';
import { AppDataSource } from '../loader/database';

export type UpdateUser = Partial<Omit<UserEntity, 'id'>>;

export type UserRepositoryInterface = Repository<UserEntity> & {
  getOneByEmail(email: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  getOneByUsername(username: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  getOneById(id: string, withPassword?: boolean): Promise<UserEntityInterface | null>;
  updateUser(userId: string, user: UpdateUser): Promise<void>;
  createOne(user: User): Promise<User>;
};

export const UserRepository: UserRepositoryInterface = AppDataSource.getRepository(
  UserEntity,
).extend({
  getOneByEmail(email: string, withPassword: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.email = :email', { email })

    if(withPassword){
      query.addSelect('user.password')
    }

    const user = query.getOne()

    return user;
  },
  getOneByUsername(username: string, withPassword: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.username = :username', { username })

    if(withPassword){
      query.addSelect('user.password')
    }

    const user = query.getOne()

    return user;
  },
  getOneById(id: string, withPassword: boolean): Promise<UserEntityInterface | null> {
    const query = this.createQueryBuilder('user').where('user.id = :id', { id })

    if(withPassword){
      query.addSelect('user.password')
    }

    const user = query.getOne()

    return user;
  },
  async updateUser(userId: string, user: UpdateUser): Promise<void> {
    await this.createQueryBuilder('user').update().set(user).where({ id: userId }).execute();
  },
  async createOne(user: User): Promise<User> {
    const newUser = this.create(user);
    await this.save(newUser);
    return newUser;
  },
});
