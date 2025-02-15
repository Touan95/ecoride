import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Issue already associated to an organization',
    publicMessage: 'Issue already associated to an organization',
    code: ErrorCodes.ISSUE_ALREADY_ASSOCIATED_TO_AN_ORGANIZATION,
    statusCode: HttpStatuses.FORBIDDEN,
  });
