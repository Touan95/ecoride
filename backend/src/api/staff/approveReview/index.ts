import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const approveReview = Router().patch(
  '/review/:reviewId/approve',
  validationMiddleware,
  validatedExpressRequest(route),
);
