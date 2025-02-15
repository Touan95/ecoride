import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';

export const adminRouter = Router()
  .use(jwtMiddleware({ requiresAdmin: true }))
