import { generateAccessToken } from '../../../../../core/jwt/generateToken';
import { UserEntityInterface } from '../../../../../entities/user.entity';

export const getAccessTokenFromUser = async (user: UserEntityInterface): Promise<string> => {
  return generateAccessToken({
    email: user.email,
    type: user.type,
    userId: user.id,
    username: user.username,
  });
};
