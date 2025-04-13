import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

export interface GetUserForAdminServiceOptions {
  username: string;
  email: string;
  adminId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  username,
  email,
  adminId,
  userRepository,
}: GetUserForAdminServiceOptions): Promise<User | null> => {
  const admin = await userRepository.getOneById(adminId);
  if (!admin) {
    throw userNotFoundError();
  }

  if (!admin.isAdmin) {
    throw userNotAdminError();
  }

  if (email) {
    const user = await userRepository.getOneByEmail(email);

    return user ?? null;
  }

  if (username) {
    const user = await userRepository.getOneByUsername(username);

    return user ?? null;
  }

  return null;
};
