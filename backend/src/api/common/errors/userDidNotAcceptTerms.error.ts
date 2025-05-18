import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'User did not accept terms',
    publicMessage: "Vous devez accepter les conditions d'utilisation",
    code: ErrorCodes.USER_DID_NOT_ACCEPT_TERMS,
    statusCode: HttpStatuses.CONFLICT,
  });
