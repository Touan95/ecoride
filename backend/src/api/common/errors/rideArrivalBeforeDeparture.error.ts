import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'New ride arrival date before departure date',
    publicMessage: "La date d'arrivée ne peut pas être avant la date de départ",
    code: ErrorCodes.RIDE_ARRIVAL_BEFORE_DEPARTURE,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
