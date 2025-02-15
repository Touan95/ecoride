import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { BaseError, createValidationErrors } from '../../../core/utils/validationErrors';
import { ErrorCodes } from '../enums/errorCodes.enum';

const errors: BaseError[] = [
  {
    name: 'agentId',
    message: 'this issue is already assigned to this agent',
    type: 'issue-already-assigned-to-agent',
  },
];

export default (): IAppError =>
  buildError({
    message: 'this issue is already assigned to this agent',
    publicMessage: 'this issue is already assigned to this agent',
    code: ErrorCodes.ISSUE_AGENT_ALREADY_EXISTS,
    statusCode: HttpStatuses.BAD_REQUEST,
    context: {
      validationErrors: createValidationErrors(errors),
    },
  });
