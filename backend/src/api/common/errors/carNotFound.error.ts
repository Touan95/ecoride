import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Car not found',
    publicMessage: 'Voiture non trouvée',
    code: ErrorCodes.CAR_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
