import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const changeDriverPreferences = Router().patch(
  '/:userId/driver',
  validationMiddleware,
  validatedExpressRequest(route),
);
