import { Router } from 'express';
import { createTransaction } from './create';

export const transactionRouter = Router().use(createTransaction);
