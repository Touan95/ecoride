import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface UserPasswordChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UserPasswordChangedResponse => ({
  message: 'The user password has been changed',
  code: ResponseCodes.CHANGE_PASSWORD_SUCCESS,
});
