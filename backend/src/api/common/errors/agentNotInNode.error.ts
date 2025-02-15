import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message:
      "You are not allowed to affect this issue an agent who doesn't belong to this issue node.",
    publicMessage:
      "You are not allowed to affect this issue an agent who doesn't belong to this issue node.",
    code: ErrorCodes.AFFECT_ISSUE_NOT_NODE_AGENT_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
