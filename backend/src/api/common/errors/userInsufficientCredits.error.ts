import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: "User's credits are not enough for this ride",
    publicMessage: "User's credits are not enough for this ride",
    code: ErrorCodes.NOT_ENOUGH_CREDITS,
    statusCode: HttpStatuses.FORBIDDEN,
  });
