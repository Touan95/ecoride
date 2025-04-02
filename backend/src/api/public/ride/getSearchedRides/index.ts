import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';

export const getSearchedRides = Router().get(
  '/rides',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validationMiddleware,
  validatedExpressRequest(route),
);
