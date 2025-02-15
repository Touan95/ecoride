import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'The user does not belong to the organization',
    publicMessage: 'The user does not belong to the organization',
    code: ErrorCodes.USER_NOT_IN_ORGANIZATION,
    statusCode: HttpStatuses.FORBIDDEN,
  });
