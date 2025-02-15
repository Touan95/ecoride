import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Category not found',
    publicMessage: 'Category not found',
    code: ErrorCodes.CATEGORY_NOT_FOUND,
    statusCode: HttpStatuses.NOT_FOUND,
  });
