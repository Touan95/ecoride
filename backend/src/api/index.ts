import { Router } from 'express';
import { adminRouter } from './admin';
import { agentRouter } from './agent';
import { publicRouter } from './public';
import { userRouter } from './user';

export default Router()
  .use('/agent', agentRouter)
  .use('/admin', adminRouter)
  .use('/user', userRouter)
  .use(publicRouter);
