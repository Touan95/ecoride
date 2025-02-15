import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'you are not allowed to change this issue status',
    publicMessage: 'you are not allowed to change this issue status',
    code: ErrorCodes.CHANGE_STATUS_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
