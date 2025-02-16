import { Router } from 'express';
import { transactionRouter } from './transactions';
import { getMe } from './getMe';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { changeType } from './changeType';
import { getOneUser } from './getOne';
import { changeDriverPreferences } from './changeDriverPreferences';

export const userRouter = Router()
  .use(jwtMiddleware({}))
  .use(transactionRouter)
  .use(getMe)
  .use(changeType)
  .use(changeDriverPreferences)
  .use(getOneUser)
  
