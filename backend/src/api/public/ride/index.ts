import { Router } from 'express';
import { getSearchedRides } from './getSearchedRides';
import { getRideDetails } from './getRideDetails';

export const publicRideRouter = Router().use(getSearchedRides).use(getRideDetails);
