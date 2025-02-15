import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Issue not found',
    publicMessage: 'Issue not found',
    code: ErrorCodes.ISSUE_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
