import { Router } from 'express';
import { getMe } from './getMe';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { changeType } from './changeType';
import { getOneUser } from './getOne';
import { changeDriverPreferences } from './changeDriverPreferences';
import { userCarRouter } from './car';
import { userRideRouter } from './ride';
import { changePassword } from './changePassword';
import { acceptTerms } from './acceptTerms';

export const userRouter = Router()
  .use(jwtMiddleware({}))
  .use(getMe)
  .use(changeType)
  .use(changePassword)
  .use(changeDriverPreferences)
  .use(getOneUser)
  .use(userCarRouter)
  .use(userRideRouter)
  .use(acceptTerms);
