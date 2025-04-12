import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const resolveDispute = Router().patch(
  '/review/:reviewId/dispute',
  validationMiddleware,
  validatedExpressRequest(route),
);
