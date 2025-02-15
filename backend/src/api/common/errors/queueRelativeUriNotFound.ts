import { IAppError, buildError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (queueId: string): IAppError =>
  buildError({
    message: 'Queue relative uri not found',
    publicMessage: 'Queue relative uri not found',
    code: ErrorCodes.QUEUE_RELATIVE_URI_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
    context: {
      queueId,
    },
  });
