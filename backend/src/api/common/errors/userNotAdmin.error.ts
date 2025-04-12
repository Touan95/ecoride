import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User not admin',
    publicMessage: 'User not admin',
    code: ErrorCodes.USER_NOT_ADMIN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
