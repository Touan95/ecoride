import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (contentMessage?: string): IAppError =>
  buildError({
    message: 'Organization not found',
    publicMessage: 'Organization not found',
    code: ErrorCodes.ORGANIZATION_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
    context: { contentMessage },
  });
