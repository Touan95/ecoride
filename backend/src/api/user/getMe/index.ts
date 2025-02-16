import { Router } from 'express';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';
import route from './route';

export const getMe = Router().get(
  '/me',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validatedExpressRequest(route),
);
