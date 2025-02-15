import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'you are not allowed to assign this issue to this agent',
    publicMessage: 'you are not allowed to assign this issue to this agent',
    code: ErrorCodes.ISSUE_AGENT_ASSIGNATION_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
