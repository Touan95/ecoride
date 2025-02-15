import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { BaseError, createValidationErrors } from '../../../core/utils/validationErrors';
import { ErrorCodes } from '../enums/errorCodes.enum';

const errors: BaseError[] = [
  {
    name: 'agentId',
    message: 'agent already in this node',
    type: 'agent-already-in-node',
  },
  {
    name: 'nodeId',
    message: 'node already assigned to agent',
    type: 'node-already-assigned-to-agent',
  },
];

export default (): IAppError =>
  buildError({
    message: 'This agent already belongs to this node.',
    publicMessage: 'This agent already belongs to this node.',
    code: ErrorCodes.AGENT_ALREADY_IN_NODE,
    statusCode: HttpStatuses.BAD_REQUEST,
    context: {
      validationErrors: createValidationErrors(errors),
    },
  });
