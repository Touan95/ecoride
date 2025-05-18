import { UpdateUser, UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

interface AcceptTermsOptions {
  userId: string;
  termsAccepted: boolean;
  userRepository: UserRepositoryInterface;
}

export const service = async ({
  userId,
  termsAccepted,
  userRepository,
}: AcceptTermsOptions): Promise<void> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const now = new Date();

  const updateUserValues: UpdateUser = {
    termsAccepted,
    termsAcceptedAt: now,
    isInvitationPending: false,
  };

  await userRepository.updateUser(userId, updateUserValues);
};
