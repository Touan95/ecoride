import { Router } from 'express';
import { staffRouter } from './staff';
import { publicRouter } from './public';
import { userRouter } from './user';
import { adminRouter } from './admin';

export default Router()
  .use('/user', userRouter)
  .use('/staff', staffRouter)
  .use('/admin', adminRouter)
  .use(publicRouter);
