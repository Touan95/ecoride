import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { BaseError, createValidationErrors } from '../../../core/utils/validationErrors';
import { ErrorCodes } from '../enums/errorCodes.enum';

const errors: BaseError[] = [
  {
    name: 'email',
    message: 'An user with this email address is already in this organization',
    type: 'user-already-in-organization',
  },
];

export default (): IAppError =>
  buildError({
    message: 'An user with this email address is already in this organization',
    publicMessage: 'An user with this email address is already in this organization',
    code: ErrorCodes.USER_ALREADY_IN_ORGANIZATION,
    statusCode: HttpStatuses.FORBIDDEN,
    context: {
      validationErrors: createValidationErrors(errors),
    },
  });
