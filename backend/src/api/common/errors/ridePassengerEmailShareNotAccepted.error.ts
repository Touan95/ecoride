import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride passenger email share not accepted',
    publicMessage: "Partage de l'adresse e-mail non accepté",
    code: ErrorCodes.RIDE_PASSENGER_EMAIL_SHARE_NOT_ACCEPTED,
    statusCode: HttpStatuses.FORBIDDEN,
  });
