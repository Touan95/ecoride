import { RequestHandler } from 'express';
import cors from 'cors';
import config from '../../loader/config';

export const corsMiddleware: RequestHandler = cors({ origin: config.ALLOWED_ORIGINS });
