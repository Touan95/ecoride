import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Internal server error',
    publicMessage: "Une erreur innatendu s'est produite, veuillez réessiller plus tard",
    code: ErrorCodes.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatuses.INTERNAL_SERVER_ERROR,
  });
