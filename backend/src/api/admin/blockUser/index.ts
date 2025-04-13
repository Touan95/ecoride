import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const blockUser = Router().patch(
  '/user/:userId/block',
  validationMiddleware,
  validatedExpressRequest(route),
);
