import { AuthObject, RefreshTokenAuthObjectType } from '../../../../../core/jwt/AuthObject';
import {
  buildAccessTokenObject,
  buildRefreshTokenObject,
} from '../../../../../core/jwt/verifyToken';
import invalidTokenError from '../../../../common/errors/invalidToken.error';

interface CheckRefreshTokenOptions {
  refreshToken: string;
  accessToken: string;
}

const getPayloadAccessAndRefreshToken = async (
  accessToken: string,
  refreshToken: string,
): Promise<{
  payloadAccessToken: AuthObject;
  payloadRefreshToken: RefreshTokenAuthObjectType;
}> => {
  try {
    const payloadAccessToken = await buildAccessTokenObject(accessToken, true);
    const payloadRefreshToken = await buildRefreshTokenObject(refreshToken);

    if (!payloadAccessToken || !payloadRefreshToken) {
      throw new Error();
    }

    return {
      payloadAccessToken,
      payloadRefreshToken,
    };
  } catch {
    throw invalidTokenError();
  }
};

export const checkAccessAndRefreshToken = async ({
  refreshToken,
  accessToken,
}: CheckRefreshTokenOptions): Promise<AuthObject> => {
  const { payloadAccessToken, payloadRefreshToken } = await getPayloadAccessAndRefreshToken(
    accessToken,
    refreshToken,
  );

  if (!payloadAccessToken || !payloadRefreshToken) {
    throw invalidTokenError();
  }
  if (payloadRefreshToken.userId !== payloadAccessToken.userId) {
    throw invalidTokenError();
  }

  return payloadAccessToken;
};
