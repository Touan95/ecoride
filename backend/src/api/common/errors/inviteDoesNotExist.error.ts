import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'There is no invitation for this email to join this organization.',
    publicMessage: 'There is no invitation for this email to join this organization.',
    code: ErrorCodes.INVITE_DOES_NOT_EXIST,
    statusCode: HttpStatuses.FORBIDDEN,
  });
