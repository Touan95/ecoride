import { Router } from 'express';
import {
  CacheDuration,
  customCacheMiddleware,
} from '../../../../core/middlewares/cacheControl.middleware';
import { validatedExpressRequest } from '../../../../core/utils/validatedExpressRequest';
import route from './route';

export const testMail = Router().post(
  '/testmail',
  customCacheMiddleware({ cacheDuration: CacheDuration.ZERO }),
  validatedExpressRequest(route),
);
