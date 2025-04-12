import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const getOneReview = Router().get(
  '/review/:reviewId',
  validationMiddleware,
  validatedExpressRequest(route),
);
