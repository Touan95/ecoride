import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const acceptTerms = Router().patch(
  '/accept-terms',
  validationMiddleware,
  validatedExpressRequest(route),
);
