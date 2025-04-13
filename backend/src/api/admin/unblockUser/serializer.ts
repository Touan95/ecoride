import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface UnblockUserResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UnblockUserResponse => ({
  message: 'You have unblocked the user with success',
  code: ResponseCodes.UNBLOCK_USER_SUCCESS,
});
