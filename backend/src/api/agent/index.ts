import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';

export const agentRouter = Router().use(jwtMiddleware({}));
