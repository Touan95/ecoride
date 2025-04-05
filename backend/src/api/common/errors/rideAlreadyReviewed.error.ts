import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'You have already reviewed this ride',
    publicMessage: 'You have already reviewed this ride',
    code: ErrorCodes.RIDE_ALREADY_REVIEWED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
