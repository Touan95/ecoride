import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is blocked',
    publicMessage: "L'utilisateur est bloqué",
    code: ErrorCodes.USER_BLOCKED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
