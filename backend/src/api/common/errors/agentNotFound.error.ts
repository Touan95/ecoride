import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Agent not found',
    publicMessage: 'Agent not found',
    code: ErrorCodes.AGENT_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
