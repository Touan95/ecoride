import { Router } from 'express';
import { jwtMiddleware } from '../../core/middlewares/jwt.middleware';
import { giveStaffAccess } from './giveStaffAccess';
import { getStatistics } from './getStatistics';
import { getAllStaff } from './getAllStaff';
import { blockUser } from './blockUser';
import { unblockUser } from './unblockUser';
import { getBlockedUsers } from './getBlockedUsers';
import { getUserForAdmin } from './getUserForAdmin';

export const adminRouter = Router()
  .use(jwtMiddleware({ requiresAdmin: true }))
  .use(getStatistics)
  .use(getAllStaff)
  .use(blockUser)
  .use(unblockUser)
  .use(getBlockedUsers)
  .use(giveStaffAccess)
  .use(getUserForAdmin);
