import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User email already exists',
    publicMessage: 'Cet email est déjà utilisé',
    code: ErrorCodes.USER_EMAIL_ALREADY_EXISTS,
    statusCode: HttpStatuses.CONFLICT,
  });
