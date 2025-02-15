import { Router } from 'express';
import { authenticationRouter } from './authentication';

export const publicRouter = Router()
  .use(authenticationRouter)
