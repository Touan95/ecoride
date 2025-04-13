import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not a driver',
    publicMessage: "L'utilisateur n'est pas un conducteur",
    code: ErrorCodes.USER_NOT_DRIVER,
    statusCode: HttpStatuses.FORBIDDEN,
  });
