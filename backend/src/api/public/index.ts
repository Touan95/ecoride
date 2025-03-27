import { Router } from 'express';
import { authenticationRouter } from './authentication';
import { publicRideRouter } from './ride';

export const publicRouter = Router().use(authenticationRouter).use(publicRideRouter);
