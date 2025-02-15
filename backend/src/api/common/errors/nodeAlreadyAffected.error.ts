import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'issue already affected to one node',
    publicMessage: 'issue already affected to one node',
    code: ErrorCodes.NODE_ALREADY_AFFECTED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
