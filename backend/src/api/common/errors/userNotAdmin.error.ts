import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not an admin',
    publicMessage: "L'utilisateur n'est pas un administrateur",
    code: ErrorCodes.USER_NOT_ADMIN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
