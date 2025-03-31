import { Router } from 'express';
import { getMe } from './getMe';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { changeType } from './changeType';
import { getOneUser } from './getOne';
import { changeDriverPreferences } from './changeDriverPreferences';
import { userCarRouter } from './car';
import { userRideRouter } from './ride';

export const userRouter = Router()
  .use(jwtMiddleware({}))
  .use(getMe)
  .use(changeType)
  .use(changeDriverPreferences)
  .use(getOneUser)
  .use(userCarRouter)
  .use(userRideRouter);
  