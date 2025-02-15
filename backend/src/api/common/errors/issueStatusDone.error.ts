import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message:
      'You are not allowed to change this issue status which is already DONE and affected to an agent.',
    publicMessage:
      'You are not allowed to change this issue status which is already DONE and affected to an agent.',
    code: ErrorCodes.AFFECT_DONE_AND_AFFECTED_ISSUE_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
