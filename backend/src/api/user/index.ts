import { Router } from 'express';
import { transactionRouter } from './transactions';
import { getMe } from './getMe';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';

export const userRouter = Router()
  .use(jwtMiddleware({}))
  .use(transactionRouter)
  .use(getMe)
