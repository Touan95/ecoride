import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is already blocked',
    publicMessage: "L'utilisateur est déjà bloqué",
    code: ErrorCodes.USER_ALREADY_BLOCKED,
    statusCode: HttpStatuses.CONFLICT,
  });
