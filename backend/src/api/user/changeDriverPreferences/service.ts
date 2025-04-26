import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface ChangeDriverPreferencesOptions {
  userId: string;
  acceptsPets: boolean;
  acceptsSmoking: boolean;
  customRules: string[];
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  acceptsPets,
  acceptsSmoking,
  customRules,
  userRepository,
}: ChangeDriverPreferencesOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const updateUserValues: UpdateUser = { acceptsSmoking, acceptsPets, customRules };

  await userRepository.updateUser(userId, updateUserValues);
};
