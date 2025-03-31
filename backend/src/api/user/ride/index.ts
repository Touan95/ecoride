import { Router } from 'express';
import { addRide } from './addRide';
import { bookSeat } from './bookSeat';
import { getPassengerRides } from './getPassengerRides';
import { getDriverRides } from './getDriverRides';

export const userRideRouter = Router().use(addRide).use(bookSeat).use(getPassengerRides).use(getDriverRides)
