import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User is not staff',
    publicMessage: "L'utilisateur n'est pas un membre de l'équipe",
    code: ErrorCodes.USER_NOT_STAFF,
    statusCode: HttpStatuses.FORBIDDEN,
  });
