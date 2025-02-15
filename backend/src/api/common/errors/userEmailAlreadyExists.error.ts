import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'This user already exists with this email',
    publicMessage: 'This user already exists with this email',
    code: ErrorCodes.USER_EMAIL_ALREADY_EXISTS,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
