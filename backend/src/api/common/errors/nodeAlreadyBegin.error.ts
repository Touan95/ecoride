import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'issue already begin by one agent',
    publicMessage: 'issue already begin by one agent',
    code: ErrorCodes.NODE_ALREADY_BEGIN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
