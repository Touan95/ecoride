import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { refresh } from './refresh';

export const authenticationRouter = Router().use(register).use(login).use(refresh);
