import { Router } from 'express';
import { addRide } from './addRide';

export const userRideRouter = Router().use(addRide)
