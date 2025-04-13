import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User not blocked',
    publicMessage: 'User not blocked',
    code: ErrorCodes.USER_NOT_BLOCKED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
