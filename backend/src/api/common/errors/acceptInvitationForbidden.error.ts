import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Accept invitation forbidden',
    publicMessage: 'Accept invitation forbidden',
    code: ErrorCodes.ACCEPT_INVITATION_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
