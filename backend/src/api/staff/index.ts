import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { getReviewsToApprove } from './getReviewsToApprove';
import { approveReview } from './approveReview';

export const staffRouter = Router().use(jwtMiddleware({ requiresStaff: true })).use(getReviewsToApprove).use(approveReview);
