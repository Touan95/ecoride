import { Router } from 'express';
import route from './route';
import { validatedExpressRequest } from '../../../core/utils/validatedExpressRequest';

export const getStatistics = Router().get(
  '/statistics',
  validatedExpressRequest(route),
);
