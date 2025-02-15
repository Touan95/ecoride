import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'you are not allowed to begin this issue',
    publicMessage: 'The agent is not allowed to begin this issue',
    code: ErrorCodes.BEGIN_ISSUE_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
