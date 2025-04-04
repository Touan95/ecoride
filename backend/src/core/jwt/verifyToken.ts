import { verify } from 'jsonwebtoken';
import invalidTokenError from '../../api/common/errors/invalidToken.error';
import config from '../../loader/config';
import { invalidJwtTokenFormatError } from '../../api/common/errors/invalidJwtTokenFormatError';
import { AuthObject, RefreshTokenAuthObjectType } from './AuthObject';

interface VerifyTokenOptions {
  token: string;
  secret: string;
  ignoreExpiration?: boolean;
}

export const checkAndReturnAuthAccessToken = (header: string | undefined): string => {
  if (!header?.startsWith('Bearer')) {
    throw invalidJwtTokenFormatError();
  }

  return header.replace('Bearer ', '');
};

export const verifyToken = async <T extends object>({
  token,
  secret,
  ignoreExpiration = false,
}: VerifyTokenOptions): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    verify(
      token,
      secret,
      {
        ignoreExpiration,
      },
      (err, decoded) => {
        if (err) {
          return reject(err);
        }
        if (decoded) {
          resolve(decoded as T);
        }
        return reject();
      },
    );
  });
};

export const buildTokenObject = async <T extends object>(
  token: string,
  secret: string,
  ignoreExpiration = false,
): Promise<T> => {
  try {
    const decoded = await verifyToken<T>({ token, secret, ignoreExpiration });

    if (!decoded) {
      throw invalidTokenError();
    }

    return decoded;
  } catch {
    throw invalidTokenError();
  }
};

export const buildAccessTokenObject = (
  token: string,
  ignoreExpiration = false,
): Promise<AuthObject> =>
  buildTokenObject<AuthObject>(token, config.ACCESS_TOKEN_SECRET, ignoreExpiration);

export const buildRefreshTokenObject = (token: string): Promise<RefreshTokenAuthObjectType> =>
  buildTokenObject<RefreshTokenAuthObjectType>(token, config.REFRESH_TOKEN_SECRET);
