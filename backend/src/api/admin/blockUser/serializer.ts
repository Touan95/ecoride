import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface BlockUserResponse {
  message: string;
  code: ResponseCodes;
}

export default (): BlockUserResponse => ({
  message: 'You have blocked the user with success',
  code: ResponseCodes.BLOCK_USER_SUCCESS,
});
