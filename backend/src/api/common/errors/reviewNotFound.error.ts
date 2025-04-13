import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Review not found',
    publicMessage: 'Avis non trouvé',
    code: ErrorCodes.REVIEW_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
