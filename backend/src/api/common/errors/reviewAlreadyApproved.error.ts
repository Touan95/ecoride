import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Review is already approved',
    publicMessage: "L'avis est déjà approuvé",
    code: ErrorCodes.REVIEW_ALREADY_APPROVED,
    statusCode: HttpStatuses.CONFLICT,
  });
