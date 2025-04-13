import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const unblockUser = Router().patch(
  '/user/:userId/unblock',
  validationMiddleware,
  validatedExpressRequest(route),
);
