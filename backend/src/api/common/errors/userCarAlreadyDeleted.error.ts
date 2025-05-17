import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User car already deleted',
    publicMessage: 'Cette voiture a déjà été supprimée',
    code: ErrorCodes.CAR_ALREADY_DELETED,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
