import { generateRefreshToken } from '../../../../core/jwt/generateToken';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';
import userNotFoundError from '../../../common/errors/userNotFound.error';
import { getAccessTokenFromUser } from '../common/services/getAccessTokenFromUser.service';
import { checkAccessAndRefreshToken } from './services/checkAccessAndRefreshToken .service';

interface LoginServiceOptions {
  accessToken: string;
  refreshToken: string;
  userRepository: UserRepositoryInterface;
}

interface RefreshServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export default async ({
  accessToken,
  refreshToken,
  userRepository,
}: LoginServiceOptions): Promise<RefreshServiceResponse> => {
  const { userId } = await checkAccessAndRefreshToken({
    refreshToken,
    accessToken,
  });

  const user = await userRepository.getOneById(userId);
  if (!user) {
    throw userNotFoundError();
  }

  const newAccessToken = await getAccessTokenFromUser(user);
  const newRefreshToken = await generateRefreshToken({ userId: user.id });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
