import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not a passenger of this ride',
    publicMessage: 'User is not a passenger of this ride',
    code: ErrorCodes.USER_NOT_PASSENGER,
    statusCode: HttpStatuses.FORBIDDEN,
  });
