import { Router } from 'express';
import { getSearchedRides } from './getSearchedRides';
import { getRideDetails } from './getRideDetails';
import { getReviewsDetails } from './getReviews';

export const publicRideRouter = Router()
  .use(getSearchedRides)
  .use(getRideDetails)
  .use(getReviewsDetails);
