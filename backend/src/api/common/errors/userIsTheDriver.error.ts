import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is the driver',
    publicMessage: "L'utilisateur est le conducteur",
    code: ErrorCodes.USER_IS_DRIVER,
    statusCode: HttpStatuses.FORBIDDEN,
  });
