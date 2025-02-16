import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const changeType = Router().patch(
  '/:userId/type',
  validationMiddleware,
  validatedExpressRequest(route),
);
