import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface CreateTransactionResponse {
  message: string;
  code: ResponseCodes;
}

export default (): CreateTransactionResponse => ({
  message: 'The transaction has been created',
  code: ResponseCodes.CREATE_TRANSACTION_SUCCESS,
});
