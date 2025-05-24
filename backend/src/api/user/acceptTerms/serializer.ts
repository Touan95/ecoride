import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface AcceptTermsResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AcceptTermsResponse => ({
  message: "Les conditions d'utilisation ont été acceptées avec succès",
  code: ResponseCodes.ACCEPT_TERMS_SUCCESS,
});
