import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'This agent is not a referent of any node in this organization',
    publicMessage: 'This agent is not a referent of any node in this organization',
    code: ErrorCodes.AGENT_NOT_REFERENT,
    statusCode: HttpStatuses.FORBIDDEN,
  });
