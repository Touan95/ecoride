import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'You are not allowed to start this ride yet',
    publicMessage: 'You are not allowed to start this ride yet',
    code: ErrorCodes.RIDE_START_TOO_SOON,
    statusCode: HttpStatuses.FORBIDDEN,
  });
