import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is already a passenger',
    publicMessage: "L'utilisateur est déjà un passager",
    code: ErrorCodes.USER_ALREADY_PASSENGER,
    statusCode: HttpStatuses.CONFLICT,
  });
