import { UserEntityInterface } from '../../../entities/user.entity';
import { UserRepositoryInterface } from '../../../repositories/user.repository';
import userNotFoundError from '../../common/errors/userNotFound.error';

export interface GetMeServiceOptions {
  userId: string;
  userRepository: UserRepositoryInterface;
}

export interface GetMeServiceResponse {
  user: UserEntityInterface;
}

export default async ({
  userId,
  userRepository,
}: GetMeServiceOptions): Promise<GetMeServiceResponse> => {
  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  return { user };
};
