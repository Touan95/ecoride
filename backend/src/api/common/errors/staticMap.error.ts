import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'An error happened while generating the static image.',
    publicMessage: 'An error happened while generating the static image.',
    code: ErrorCodes.STATIC_MAP_ERROR,
    statusCode: HttpStatuses.SERVICE_UNAVAILABLE,
  });
