import { ResponseCodes } from "../../common/enums/responseCodes.enum";

export interface UserTypeChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UserTypeChangedResponse => ({
  message: 'The user type has been changed',
  code: ResponseCodes.USER_TYPE_CHANGE_SUCCESS,
});
