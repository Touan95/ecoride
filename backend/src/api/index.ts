import { Router } from 'express';
import { staffRouter } from './staff';
import { agentRouter } from './agent';
import { publicRouter } from './public';
import { userRouter } from './user';

export default Router()
  .use('/agent', agentRouter)
  .use('/admin', staffRouter)
  .use('/user', userRouter)
  .use('/staff', staffRouter)
  .use(publicRouter);
