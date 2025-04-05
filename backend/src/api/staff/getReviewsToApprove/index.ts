import { Router } from 'express';
import route from './route';
import { CacheDuration, customCacheMiddleware } from '../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const getReviewsToApprove = Router().get(
  '/reviews',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validatedExpressRequest(route),
);
