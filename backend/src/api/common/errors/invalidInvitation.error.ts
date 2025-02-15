import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Invalid invitation',
    publicMessage: 'Invalid invitation',
    code: ErrorCodes.INVALID_INVITATION,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
