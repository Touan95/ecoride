import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'You are not allowed to end this ride with this status',
    publicMessage: 'Vous ne pouvez pas terminer ce trajet avec ce statut',
    code: ErrorCodes.RIDE_NOT_ONGOING,
    statusCode: HttpStatuses.FORBIDDEN,
  });
