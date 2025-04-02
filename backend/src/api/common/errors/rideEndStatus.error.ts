import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'You are not allowed to end this ride with this status',
    publicMessage: 'You are not allowed to end this ride with this status',
    code: ErrorCodes.RIDE_NOT_UPCOMING,
    statusCode: HttpStatuses.FORBIDDEN,
  });
