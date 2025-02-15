import { sign, SignOptions } from 'jsonwebtoken';
import config from '../../loader/config';
import {
  ApproveRoutingIssueObject,
  AuthObject,
  JoinOrganizationObject,
  RefreshTokenAuthObjectType,
  ResetPasswordTokenAuthObjectType,
} from './AuthObject';

interface GenerateTokenOptions<T extends object> {
  generateJwtOptions: T;
  secret: string;
  expiresIn?: number | string;
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
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<AuthObject>({
    expiresIn: expiresIn ?? config.ACCESS_TOKEN_LIFE,
    secret: config.ACCESS_TOKEN_SECRET,
    generateJwtOptions,
  });

export const generateResetPasswordToken = (
  generateResetPasswordJwtOptions: ResetPasswordTokenAuthObjectType,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<ResetPasswordTokenAuthObjectType>({
    expiresIn: expiresIn ?? config.RESET_PASSWORD_TOKEN_LIFE,
    secret: config.RESET_PASSWORD_TOKEN_SECRET,
    generateJwtOptions: generateResetPasswordJwtOptions,
  });

export const generateRefreshToken = (
  generateRefreshJwtOptions: RefreshTokenAuthObjectType,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<RefreshTokenAuthObjectType>({
    expiresIn: expiresIn ?? config.REFRESH_TOKEN_LIFE,
    secret: config.REFRESH_TOKEN_SECRET,
    generateJwtOptions: generateRefreshJwtOptions,
  });

export const generateJoinOrganizationToken = (
  generateJoinOrganizationJwtOptions: JoinOrganizationObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<JoinOrganizationObject>({
    expiresIn: expiresIn ?? config.JOIN_ORGANIZATION_TOKEN_LIFE,
    secret: config.JOIN_ORGANIZATION_TOKEN_SECRET,
    generateJwtOptions: generateJoinOrganizationJwtOptions,
  });

export const generateApproveRoutingIssueToken = (
  generateApproveRoutingIssueJwtOptions: ApproveRoutingIssueObject,
  expiresIn?: number | string,
): Promise<string> =>
  generateToken<ApproveRoutingIssueObject>({
    expiresIn: expiresIn,
    secret: config.APPROVE_ROUTING_ISSUE_TOKEN_SECRET,
    generateJwtOptions: generateApproveRoutingIssueJwtOptions,
  });
