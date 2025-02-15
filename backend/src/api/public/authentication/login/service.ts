import argon2 from 'argon2';
import badCredentialsError from '../../../common/errors/badCredentials.error';
import { generateRefreshToken } from '../../../../core/jwt/generateToken';
import { getAccessTokenFromUser } from '../common/services/getAccessTokenFromUser.service';
import { UserRepositoryInterface } from '../../../../repositories/user.repository';

export interface LoginServiceOptions {
  email: string;
  password: string;
  userRepository: UserRepositoryInterface;
}

export interface LoginServiceResponse {
  accessToken: string;
  refreshToken: string;
}

export default async ({
  email,
  password,
  userRepository,
}: LoginServiceOptions): Promise<LoginServiceResponse> => {
  const user = await userRepository.getOneByEmail(email, true);
  console.log("🚀 ~ user:", user)
  if (!user) {
    throw badCredentialsError();
  }
  console.log("🚀 ~ password:", password)
  console.log("🚀 ~ user.password:", user.password)

  const isGoodPassword = await argon2.verify(user.password, password);
  if (!isGoodPassword) {
    throw badCredentialsError();
  }

  const accessToken = await getAccessTokenFromUser(user);
  const refreshToken = await generateRefreshToken({ userId: user.id });

  return { accessToken, refreshToken };
};
