import { Router } from 'express';
import { getSearchedRides } from './getSearchedRides';

export const publicRideRouter = Router().use(getSearchedRides);
