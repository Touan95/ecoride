import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { testMail } from './testMail';
import { refresh } from './refresh';

export const authenticationRouter = Router().use(register).use(login).use(testMail).use(refresh);
