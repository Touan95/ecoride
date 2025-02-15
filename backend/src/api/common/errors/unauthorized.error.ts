import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Unauthorized',
    publicMessage: 'Unauthorized',
    code: ErrorCodes.UNAUTHORIZED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
