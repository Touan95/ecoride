import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'you are not allowed to affect this issue to this node',
    publicMessage: 'The agent is not allowed to affect this issue to this node',
    code: ErrorCodes.ISSUE_NODE_ASSIGNATION_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
