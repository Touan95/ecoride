import { Router } from 'express';
import { transactionRouter } from './transactions';
import { getMe } from './getMe';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { changeType } from './changeType';

export const userRouter = Router()
  .use(jwtMiddleware({}))
  .use(transactionRouter)
  .use(getMe)
  .use(changeType)
