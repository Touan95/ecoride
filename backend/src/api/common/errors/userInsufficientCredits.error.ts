import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User has insufficient credits',
    publicMessage: 'Crédits insuffisants',
    code: ErrorCodes.NOT_ENOUGH_CREDITS,
    statusCode: HttpStatuses.FORBIDDEN,
  });
