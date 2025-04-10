import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { testMail } from './testMail';

export const authenticationRouter = Router().use(register).use(login).use(testMail);
