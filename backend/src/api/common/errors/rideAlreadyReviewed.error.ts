import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride is already reviewed',
    publicMessage: 'Le trajet a déjà été évalué',
    code: ErrorCodes.RIDE_ALREADY_REVIEWED,
    statusCode: HttpStatuses.CONFLICT,
  });
