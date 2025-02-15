import { Router } from 'express';
import { transactionRouter } from './transactions';

export const publicRouter = Router()
  .use(transactionRouter)
