import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'This review has already been (un)approved',
    publicMessage: 'This review has already been (un)approved',
    code: ErrorCodes.REVIEW_ALREADY_APPROVED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
