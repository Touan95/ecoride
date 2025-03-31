import { Router } from 'express';
import route from './route';
import { CacheDuration, customCacheMiddleware } from '../../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';

export const getDriverRides = Router().get(
  '/rides/driver',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validatedExpressRequest(route),
);
