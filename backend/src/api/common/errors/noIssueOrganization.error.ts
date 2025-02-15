import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (contentMessage?: string): IAppError =>
  buildError({
    message: 'The organization id of this issue is null',
    publicMessage: 'The organization of this issue is not found.',
    code: ErrorCodes.NO_ISSUE_ORGANIZATION_ID,
    statusCode: HttpStatuses.NOT_FOUND,
    context: { contentMessage },
  });
