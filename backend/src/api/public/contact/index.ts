import { Router } from 'express';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const contact = Router().post(
  '/contact',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validatedExpressRequest(route),
);
