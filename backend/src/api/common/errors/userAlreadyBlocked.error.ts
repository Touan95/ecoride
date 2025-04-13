import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User already blocked',
    publicMessage: 'User already blocked',
    code: ErrorCodes.USER_ALREADY_BLOCKED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
