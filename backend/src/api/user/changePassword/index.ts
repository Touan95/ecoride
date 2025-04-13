import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const changePassword = Router().patch(
  '/password',
  validationMiddleware,
  validatedExpressRequest(route),
);
