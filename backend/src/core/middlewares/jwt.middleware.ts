import { NextFunction, Request, RequestHandler, Response } from 'express';

import { invalidJwtTokenFormatError } from '../../api/common/errors/invalidJwtTokenFormatError';
import { AuthObject, RequestWithJwt } from '../jwt/AuthObject';
import { buildAccessTokenObject, checkAndReturnAuthAccessToken } from '../jwt/verifyToken';

export interface IRequestWithJwt extends Request {
  jwt: AuthObject;
}

export interface JwtMiddlewareOptions {
  isOptional?: boolean;
  requiresAdmin?: boolean;
}


export const jwtMiddleware =
  (options?: JwtMiddlewareOptions): RequestHandler =>
  async (req: RequestWithJwt, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      if (options?.isOptional && !req.headers.authorization) {
        return next();
      }
      const accessToken = checkAndReturnAuthAccessToken(req.headers.authorization);
      if (!accessToken) {
        throw invalidJwtTokenFormatError();
      }
      const authObject = await buildAccessTokenObject(accessToken, !!options?.isOptional);

      if (authObject) {
        req.jwt = authObject;
        // checkAdminRequirement(options, authObject);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
