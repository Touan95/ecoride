import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface UserTypeChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UserTypeChangedResponse => ({
  message: "Le type d'utilisateur a été modifié avec succès",
  code: ResponseCodes.USER_TYPE_CHANGE_SUCCESS,
});
