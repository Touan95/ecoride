import { sign, SignOptions } from 'jsonwebtoken';
import config from '../../loader/config';
import { AuthObject, RefreshTokenAuthObjectType } from './AuthObject';

interface GenerateTokenOptions<T extends object> {
  generateJwtOptions: T;
  secret: string;
  expiresIn?: number;
}

export const generateToken = <T extends object>({
  generateJwtOptions,
  secret,
  expiresIn,
}: GenerateTokenOptions<T>): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const signOptions: SignOptions = {
      expiresIn,
    };
    if (expiresIn === undefined) {
      delete signOptions.expiresIn;
    }

    sign(generateJwtOptions, secret, signOptions, (err, token) => {
      if (err) {
        return reject(err);
      }
      if (token) {
        resolve(token);
      }
      return reject();
    });
  });
};

export const generateAccessToken = (
  generateJwtOptions: AuthObject,
  // expiresIn?: number,
): Promise<string> =>
  generateToken<AuthObject>({
    // expiresIn: expiresIn ?? config.ACCESS_TOKEN_LIFE,
    secret: config.ACCESS_TOKEN_SECRET,
    generateJwtOptions,
  });

export const generateRefreshToken = (
  generateRefreshJwtOptions: RefreshTokenAuthObjectType,
  // expiresIn?: number,
): Promise<string> =>
  generateToken<RefreshTokenAuthObjectType>({
    // expiresIn: expiresIn ?? config.REFRESH_TOKEN_LIFE,
    secret: config.REFRESH_TOKEN_SECRET,
    generateJwtOptions: generateRefreshJwtOptions,
  });
