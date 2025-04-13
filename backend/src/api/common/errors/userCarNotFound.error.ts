import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User car not found',
    publicMessage: "Voiture de l'utilisateur non trouvée",
    code: ErrorCodes.CAR_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
