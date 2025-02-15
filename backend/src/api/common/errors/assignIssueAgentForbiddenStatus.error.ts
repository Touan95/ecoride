import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { BaseError, createValidationErrors } from '../../../core/utils/validationErrors';
import { ErrorCodes } from '../enums/errorCodes.enum';

const errors: BaseError[] = [
  {
    name: 'agentId',
    message: 'the current issue status does not allow issue agent assignation',
    type: 'issue-status-not-assignable',
  },
];

export default (): IAppError =>
  buildError({
    message: 'the current issue status does not allow issue agent assignation',
    publicMessage: 'the current issue status does not allow issue agent assignation',
    code: ErrorCodes.ISSUE_AGENT_ASSIGNATION_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
    context: {
      validationErrors: createValidationErrors(errors),
    },
  });
