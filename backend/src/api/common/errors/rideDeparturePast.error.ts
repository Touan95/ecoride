import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'New ride start in the past',
    publicMessage: 'Le départ du trajet ne peut pas être dans le passé',
    code: ErrorCodes.RIDE_DEPARTURE_DATE_PAST,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
