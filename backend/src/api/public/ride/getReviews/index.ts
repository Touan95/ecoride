import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../../core/middlewares/cacheControl.middleware';

export const getReviewsDetails = Router().get(
  '/ride/:rideId/reviews',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validationMiddleware,
  validatedExpressRequest(route),
);
