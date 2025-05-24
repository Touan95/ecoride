import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface BlockUserResponse {
  message: string;
  code: ResponseCodes;
}

export default (): BlockUserResponse => ({
  message: "L'utilisateur a été bloqué avec succès",
  code: ResponseCodes.BLOCK_USER_SUCCESS,
});
