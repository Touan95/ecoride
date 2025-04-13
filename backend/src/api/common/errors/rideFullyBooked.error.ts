import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride is fully booked',
    publicMessage: 'Le trajet est complet',
    code: ErrorCodes.RIDE_FULLY_BOOKED,
    statusCode: HttpStatuses.CONFLICT,
  });
