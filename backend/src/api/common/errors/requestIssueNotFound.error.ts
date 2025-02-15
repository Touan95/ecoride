import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Request issue not found',
    publicMessage: 'Request issue not found',
    code: ErrorCodes.REQUEST_ISSUE_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
