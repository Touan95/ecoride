import { NextFunction, Request, RequestHandler, Response } from 'express';

import { invalidJwtTokenFormatError } from '../../api/common/errors/invalidJwtTokenFormatError';
import { AuthObject, RequestWithJwt } from '../jwt/AuthObject';
import { buildAccessTokenObject, checkAndReturnAuthAccessToken } from '../jwt/verifyToken';
import { buildError } from '../buildError';
import { ErrorCodes } from '../../api/common/enums/errorCodes.enum';
import { HttpStatuses } from '../httpStatuses';

export interface IRequestWithJwt extends Request {
  jwt: AuthObject;
}

export interface JwtMiddlewareOptions {
  isOptional?: boolean;
  requiresAdmin?: boolean;
  requiresStaff?: boolean;
}

const checkAdminRequirement = (
  options: JwtMiddlewareOptions | undefined,
  authObject: AuthObject,
): void => {
  if (options?.requiresAdmin && !authObject.isAdmin) {
    throw buildError({
      message: 'Attempt to log as an admin',
      publicMessage: 'Accès refusé',
      code: ErrorCodes.FORBIDDEN_ADMIN_ACCESS,
      statusCode: HttpStatuses.FORBIDDEN,
    });
  }
};

const checkStaffRequirement = (
  options: JwtMiddlewareOptions | undefined,
  authObject: AuthObject,
): void => {
  if (options?.requiresStaff && !authObject.isStaff) {
    throw buildError({
      message: 'Attempt to log as a staff',
      publicMessage: 'Accès refusé',
      code: ErrorCodes.FORBIDDEN_STAFF_ACCESS,
      statusCode: HttpStatuses.FORBIDDEN,
    });
  }
};

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
        checkAdminRequirement(options, authObject);
        checkStaffRequirement(options, authObject);
      }

      return next();
    } catch (error) {
      next(error);
    }
  };
