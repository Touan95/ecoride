import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'node not found for this organization',
    publicMessage: 'node not found for this organization',
    code: ErrorCodes.NODE_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
