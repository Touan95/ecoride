import express, { Router, Express } from 'express';
import { corsMiddleware, jsonParserMiddleware } from '../core/middlewares';
import { appErrorHandlerMiddleware } from '../core/middlewares/appErrorHandler.middleware';
import { attachLoggerMiddleware } from '../core/middlewares/attachLogger.middleware';
import { defaultCacheMiddleware } from '../core/middlewares/cacheControl.middleware';

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
