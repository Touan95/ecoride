import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface UserPasswordChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UserPasswordChangedResponse => ({
  message: 'Le mot de passe a été modifié avec succès',
  code: ResponseCodes.CHANGE_PASSWORD_SUCCESS,
});
