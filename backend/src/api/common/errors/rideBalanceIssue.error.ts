import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Ride has balance issues',
    publicMessage: 'Problème de solde pour le trajet',
    code: ErrorCodes.RIDE_BALANCE_ISSUE,
    statusCode: HttpStatuses.CONFLICT,
  });
