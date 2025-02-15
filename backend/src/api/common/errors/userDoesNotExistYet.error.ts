import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'No user with this email exists yet',
    publicMessage: 'No user with this email exists yet',
    code: ErrorCodes.USER_DOES_NOT_EXIST_YET,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
