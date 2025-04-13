import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not a passenger',
    publicMessage: "L'utilisateur n'est pas un passager",
    code: ErrorCodes.USER_NOT_PASSENGER,
    statusCode: HttpStatuses.FORBIDDEN,
  });
