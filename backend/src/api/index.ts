import { Router } from 'express';
import { staffRouter } from './staff';
import { agentRouter } from './agent';
import { publicRouter } from './public';
import { userRouter } from './user';
import { adminRouter } from './admin';

export default Router()
  .use('/agent', agentRouter)
  .use('/admin', staffRouter)
  .use('/user', userRouter)
  .use('/staff', staffRouter)
  .use('/admin', adminRouter)
  .use(publicRouter);
