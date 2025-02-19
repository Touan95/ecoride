import { UserType } from '../../../entities/user.entity';
import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface ChangeTypeOptions {
  userId: string;
  userType: UserType;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  userType,
  userRepository,
}: ChangeTypeOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const updateIssueValues: UpdateUser = { type: userType };

  await userRepository.updateUser(userId, updateIssueValues);
};
