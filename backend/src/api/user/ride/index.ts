import { Router } from 'express';
import { addRide } from './addRide';
import { bookSeat } from './bookSeat';

export const userRideRouter = Router().use(addRide).use(bookSeat)
