import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'This user already exists',
    publicMessage: 'This user already exists',
    code: ErrorCodes.USER_ALREADY_EXISTS,
    statusCode: HttpStatuses.BAD_REQUEST,
  });
