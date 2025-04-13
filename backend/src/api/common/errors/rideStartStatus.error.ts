import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'You are not allowed to start this ride with this status',
    publicMessage: 'Vous ne pouvez pas démarrer ce trajet avec ce statut',
    code: ErrorCodes.RIDE_NOT_UPCOMING,
    statusCode: HttpStatuses.CONFLICT,
  });
