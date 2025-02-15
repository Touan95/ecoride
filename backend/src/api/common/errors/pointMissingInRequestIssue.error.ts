import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Point missing in request issue',
    publicMessage: 'Point missing in request issue',
    code: ErrorCodes.POINT_MISSING_IN_REQUEST_ISSUE,
    statusCode: HttpStatuses.NOT_FOUND,
  });
