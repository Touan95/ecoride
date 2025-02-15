import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (contentMessage?: string): IAppError =>
  buildError({
    message: 'Organization email not found',
    publicMessage: 'Organization email not found',
    code: ErrorCodes.ORGANIZATION_EMAIL_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
    context: { contentMessage },
  });
