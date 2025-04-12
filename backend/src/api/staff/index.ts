import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { getReviewsToApprove } from './getReviewsToApprove';
import { approveReview } from './approveReview';
import { getOneReview } from './getOneReview';
import { resolveDispute } from './resolveDispute';

export const staffRouter = Router()
  .use(jwtMiddleware({ requiresStaff: true }))
  .use(getReviewsToApprove)
  .use(getOneReview)
  .use(approveReview)
  .use(resolveDispute);
