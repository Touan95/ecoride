import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'An error happened while initializing the app. Please try again later.',
    publicMessage: 'An error happened while initializing the app. Please try again later.',
    code: ErrorCodes.APP_INITIALIZATION_ERROR,
    statusCode: HttpStatuses.SERVICE_UNAVAILABLE,
  });
