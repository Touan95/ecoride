import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride passenger not found',
    publicMessage: 'Passager non trouvé',
    code: ErrorCodes.RIDE_PASSENGER_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
