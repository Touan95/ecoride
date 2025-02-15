import { IAppError } from '../../../../../core/buildError';
import { User } from '../../../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../../../repositories/user.repository';
import badCredentialsError from '../../../../common/errors/badCredentials.error';

interface GetAndCheckUserByIdOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
  error?: IAppError;
}

interface CheckUserOptions {
  user: User | null;
  error?: IAppError;
}

export const checkUser = ({ user, error }: CheckUserOptions): User => {
  if (!user) {
    throw error;
  }

  return user;
};

export const getAndCheckUserById = async ({
  userId,
  userRepository,
  error = badCredentialsError(),
}: GetAndCheckUserByIdOptions): Promise<User> => {
  const user = await userRepository.getOneById(userId);

  return checkUser({ user, error });
};
