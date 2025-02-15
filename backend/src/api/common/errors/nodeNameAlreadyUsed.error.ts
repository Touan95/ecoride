import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { BaseError, createValidationErrors } from '../../../core/utils/validationErrors';
import { ErrorCodes } from '../enums/errorCodes.enum';

const errors: BaseError[] = [
  {
    name: 'name',
    message: 'node name already used in this organization',
    type: 'string.duplicate',
  },
];

export default (): IAppError =>
  buildError({
    message: `node name already used in this organization`,
    publicMessage: `node name already used in this organization`,
    code: ErrorCodes.NODE_NAME_ALREADY_USED,
    statusCode: HttpStatuses.BAD_REQUEST,
    context: {
      validationErrors: createValidationErrors(errors),
    },
  });
