import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (contentMessage?: string): IAppError =>
  buildError({
    message: 'Status in not to assign',
    publicMessage: 'Status in not to assign',
    code: ErrorCodes.STATUS_NOT_TO_ASSIGN,
    statusCode: HttpStatuses.NOT_FOUND,
    context: { contentMessage },
  });
