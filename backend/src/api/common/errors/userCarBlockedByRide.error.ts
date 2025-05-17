import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User car is committed to a ride',
    publicMessage: 'Cette voiture est liée à un trajet en cours ou à venir',
    code: ErrorCodes.CAR_BLOCKED_BY_RIDE,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
