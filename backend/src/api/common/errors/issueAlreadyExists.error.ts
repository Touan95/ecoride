import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Issue already exists',
    publicMessage: 'Issue already exists',
    code: ErrorCodes.ISSUE_ALREADY_EXISTS,
    statusCode: HttpStatuses.FORBIDDEN,
  });
