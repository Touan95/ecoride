import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (contentMessage?: string): IAppError =>
  buildError({
    message: 'Issue is attributed to an node',
    publicMessage: 'Issue is attributed to an node',
    code: ErrorCodes.ISSUE_ATTRIBUTED_TO_NODE,
    statusCode: HttpStatuses.NOT_FOUND,
    context: { contentMessage },
  });
