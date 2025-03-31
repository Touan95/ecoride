import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'The ride balance does not match with the number of passengers',
    publicMessage: 'The ride balance does not match with the number of passengers',
    code: ErrorCodes.RIDE_BALANCE_ISSUE,
    statusCode: HttpStatuses.FORBIDDEN,
  });
