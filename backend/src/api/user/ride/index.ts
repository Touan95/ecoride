import { Router } from 'express';
import { addRide } from './addRide';
import { bookSeat } from './bookSeat';
import { getPassengerRides } from './getPassengerRides';
import { getDriverRides } from './getDriverRides';
import { cancelPassengerRide } from './cancelPassengerRide';
import { cancelDriverRide } from './cancelDriverRide';
import { startRide } from './startRide';
import { endRide } from './endRide';

export const userRideRouter = Router()
  .use(addRide)
  .use(bookSeat)
  .use(getPassengerRides)
  .use(getDriverRides)
  .use(cancelPassengerRide)
  .use(cancelDriverRide)
  .use(startRide)
  .use(endRide);
