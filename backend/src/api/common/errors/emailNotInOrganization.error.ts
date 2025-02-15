import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Email not found in organization',
    publicMessage: 'Email not found in organization',
    code: ErrorCodes.USER_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
