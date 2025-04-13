import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride start time is too soon',
    publicMessage: 'Le trajet commence trop tôt',
    code: ErrorCodes.RIDE_START_TOO_SOON,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
