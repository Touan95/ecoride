import express, { Router, Express } from 'express';
import { corsMiddleware, jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';
import mongoose from 'mongoose';
import { sanitizeMiddleware } from '../core/middlewares/sanitize.middleware';

const MONGO_URI = process.env.MONGO_URI ?? '';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export interface AppOptions {
  prefix: string;
  router: Router;
}

export default ({ prefix, router }: AppOptions): Express =>
  express()
    .use(attachLoggerMiddleware())
    .use(jsonParserMiddleware)
    .use(sanitizeMiddleware)
    .use(defaultCacheMiddleware)
    .use(corsMiddleware)
    .use(prefix, router)
    .use(appErrorHandlerMiddleware);
