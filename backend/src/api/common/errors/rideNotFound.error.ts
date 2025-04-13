import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride not found',
    publicMessage: 'Trajet non trouvé',
    code: ErrorCodes.RIDE_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
