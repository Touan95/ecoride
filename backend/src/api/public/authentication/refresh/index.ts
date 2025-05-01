import { Router } from 'express';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import validationMiddleware from './validator';
import route from './route';

export const refresh: Router = Router().post(
  '/refresh',
  validationMiddleware,
  validatedExpressRequest(route),
);
