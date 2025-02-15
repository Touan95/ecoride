import { Request } from 'express';
import { UserType } from '../../entities/user.entity';
export interface AuthObject {
  userId: string;
  email: string;
  username: string;
  type: UserType;
}

export interface RequestWithJwt extends Request {
  jwt: AuthObject;
}

export type RefreshTokenAuthObjectType = Pick<AuthObject, 'userId'>;

