import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'No more seats available for this ride',
    publicMessage: 'No more seats available for this ride',
    code: ErrorCodes.USER_ALREADY_PASSENGER,
    statusCode: HttpStatuses.CONFLICT,
  });
