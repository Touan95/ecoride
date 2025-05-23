/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import Joi, {
  ObjectSchema,
  ValidationResult,
  ValidationOptions,
  ValidationError,
  ArraySchema,
} from 'joi';

import { HttpStatuses } from '../httpStatuses';

const DEFAULT_ERROR_MESSAGE = 'Requête invalide';
const DEFAULT_ERROR_CODE = 'bad-request';

const JOI_OPTIONS: ValidationOptions = { abortEarly: false };

export interface RequestValidatorSchema {
  headers?: ObjectSchema<any>;
  params?: ObjectSchema<any>;
  query?: ObjectSchema<any>;
  cookies?: ObjectSchema<any>;
  body?: ObjectSchema<any>;
  file?: ObjectSchema<any>;
  files?: ArraySchema;
}

interface ErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  context: {
    validationErrors: {
      name: string | undefined;
      message: string;
      path: (string | number)[];
      type: string;
    }[];
  };
}

function buildValidator(schema: RequestValidatorSchema): ObjectSchema<RequestValidatorSchema> {
  return Joi.object({
    headers: Joi.any(),
    params: Joi.any(),
    query: Joi.any(),
    cookies: Joi.any(),
    body: Joi.any(),
    file: Joi.any(),
    files: Joi.any(),
    ...schema,
  })
    .required()
    .min(1);
}

const buildErrorMessage = (options: ValidationMiddlewareOptions | undefined): string =>
  options?.message ?? DEFAULT_ERROR_MESSAGE;

const buildErrorResponse = (
  error: ValidationError,
  options: ValidationMiddlewareOptions | undefined,
): ErrorResponse => ({
  message: buildErrorMessage(options),
  code: options?.code || DEFAULT_ERROR_CODE,
  statusCode: HttpStatuses.BAD_REQUEST,
  context: {
    validationErrors: error.details.map((detail) => ({
      name: detail.context?.key,
      message: detail.message,
      path: detail.path,
      type: detail.type,
    })),
  },
});

function validate(
  validator: ObjectSchema<RequestValidatorSchema>,
  data: any,
): ValidationResult['value'] {
  const result = validator.validate(data, JOI_OPTIONS);

  if (result.error) {
    throw result.error;
  }

  return result.value;
}

interface ExtendedRequest extends Request {
  file?: any;
  files?: any;
}

export interface ValidationMiddlewareOptions {
  message?: string;
  code?: string;
}

/**
 * Build validation middleware.
 * @param schema Joi validator schema or schema builder function (allows to use TranslationFunction when generating error messages)
 * @param options.message Message content or function that responds with message
 * @param options.code Error code
 */
export function buildValidationMiddleware(
  schema: RequestValidatorSchema,
  options?: ValidationMiddlewareOptions,
) {
  return function validationMiddleware(
    request: ExtendedRequest,
    response: Response,
    next: NextFunction,
  ): Response | void {
    const { headers, params, query, body, cookies, file, files } = request;

    try {
      const validator = buildValidator(schema);

      const validationResult = validate(validator, {
        headers,
        params,
        query,
        body,
        cookies,
        file,
        files,
      });

      request.headers = validationResult.headers;
      request.params = validationResult.params;
      request.query = validationResult.query;
      request.cookies = validationResult.cookies;
      request.body = validationResult.body;
      request.file = validationResult.file;
      request.files = validationResult.files;

      return next();
    } catch (error: any) {
      if (error.isJoi && error instanceof ValidationError) {
        const validationResponse = buildErrorResponse(error, options);

        // request.logger.warn({
        //   message: 'Validation failed',
        //   context: { validationResponse },
        // });

        return response.status(HttpStatuses.BAD_REQUEST).send(validationResponse);
      }

      return next(error);
    }
  };
}
