import { Request } from 'express';

export const getBaseUrl = (req: Omit<Request, 'params' | 'body' | 'query'>): string => {
  if (!req.headers.host) {
    throw new Error("Request's host cannot be undefined");
  }
  return `${req.protocol}://${req.headers.host}`;
};
