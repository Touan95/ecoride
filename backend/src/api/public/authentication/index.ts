import { Router } from 'express';
import { login } from './login';
import { register } from './register';

export const authenticationRouter = Router()
  .use(register)
  .use(login)
