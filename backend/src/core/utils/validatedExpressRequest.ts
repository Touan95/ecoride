/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, RequestHandler } from 'express';
export type ValidatedRequest<RequestTypes> = Omit<Request, 'params' | 'body' | 'query'> &
  RequestTypes;

type RequestHandlerWithCustomRequestType = (
  ...params: Parameters<RequestHandler<any, any, any, any>>
) => any;

type ValidatedExpressRequest = (route: RequestHandlerWithCustomRequestType) => any;

export const validatedExpressRequest: ValidatedExpressRequest = (
  route: RequestHandlerWithCustomRequestType,
): RequestHandlerWithCustomRequestType =>
  function requestHandler(req, res, next): void {
    return route(req, res, next);
  };
