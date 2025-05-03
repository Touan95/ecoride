import { NextFunction, Response, Request } from 'express';
import { HttpStatuses } from '../../../core/httpStatuses';

import service from './service';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { email, message, name } = req.body;

    const response = await service({ email, message, name });

    return res.send(response).status(HttpStatuses.OK);
  } catch (error) {
    return next(error);
  }
};
