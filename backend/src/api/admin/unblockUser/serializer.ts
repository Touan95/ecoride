import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface UnblockUserResponse {
  message: string;
  code: ResponseCodes;
}

export default (): UnblockUserResponse => ({
  message: "L'utilisateur a été débloqué avec succès",
  code: ResponseCodes.UNBLOCK_USER_SUCCESS,
});
