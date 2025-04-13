import { User } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotAdminError from '../../common/errors/userNotAdmin.error';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface GetStatisticsOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  userRepository,
}: GetStatisticsOptions): Promise<User[]> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  if (!user.isAdmin) {
    throw userNotAdminError();
  }

  const allStaff = await userRepository.getAllStaff();

  const allStaffWithoutAdmin = allStaff.filter((staff) => staff.id !== userId);

  return allStaffWithoutAdmin;
};
