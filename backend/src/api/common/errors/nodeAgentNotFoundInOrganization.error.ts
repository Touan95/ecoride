import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'This agent does not belong to any node in this organization',
    publicMessage: 'This agent does not belong to any node in this organization',
    code: ErrorCodes.NODE_AGENT_NOT_FOUND_IN_ORGANIZATION,
    statusCode: HttpStatuses.NOT_FOUND,
  });
