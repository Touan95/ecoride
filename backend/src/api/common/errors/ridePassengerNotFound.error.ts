import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'RidePassenger not found',
    publicMessage: 'RidePassenger not found',
    code: ErrorCodes.RIDE_PASSENGER_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
