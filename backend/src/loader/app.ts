import express, { Router, Express } from 'express';
import { corsMiddleware, jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecoride_reviews';

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
    .use(defaultCacheMiddleware)
    .use(corsMiddleware)
    .use(prefix, router)
    .use(appErrorHandlerMiddleware);
