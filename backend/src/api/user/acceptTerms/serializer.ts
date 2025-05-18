import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface AcceptTermsResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AcceptTermsResponse => ({
  message: 'The terms have been accepted',
  code: ResponseCodes.ACCEPT_TERMS_SUCCESS,
});
