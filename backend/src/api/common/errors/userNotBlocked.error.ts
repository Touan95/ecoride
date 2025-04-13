import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not blocked',
    publicMessage: "L'utilisateur n'est pas bloqué",
    code: ErrorCodes.USER_NOT_BLOCKED,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
