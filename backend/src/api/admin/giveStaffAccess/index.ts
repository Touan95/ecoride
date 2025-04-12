import { Router } from 'express';
import route from './route';
import validationMiddleware from './validator';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const giveStaffAccess = Router().patch(
  '/user/:email/staff',
  validationMiddleware,
  validatedExpressRequest(route),
);
