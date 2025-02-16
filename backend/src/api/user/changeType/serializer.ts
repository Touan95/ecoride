import { ResponseCodes } from "../../common/enums/responseCodes.enum";

export interface StatusChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): StatusChangedResponse => ({
  message: 'The user type has bean changed',
  code: ResponseCodes.USER_TYPE_CHANGE_SUCCESS,
});
