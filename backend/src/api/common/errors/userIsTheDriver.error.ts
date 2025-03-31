import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is the driver and cannot be added as a passenger',
    publicMessage: 'User is the driver and cannot be added as a passenger',
    code: ErrorCodes.USER_IS_DRIVER,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
