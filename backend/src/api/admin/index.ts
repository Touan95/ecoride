import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { giveStaffAccess } from './giveStaffAccess';
import { getStatistics } from './getStatistics';

export const adminRouter = Router()
  .use(jwtMiddleware({ requiresAdmin: true }))
  .use(getStatistics)
  .use(giveStaffAccess);
