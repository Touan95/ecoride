import { Router } from 'express';
import { authenticationRouter } from './authentication';
import { publicRideRouter } from './ride';
import { contact } from './contact';

export const publicRouter = Router().use(authenticationRouter).use(publicRideRouter).use(contact);
