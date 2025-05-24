import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface GiveStaffAccessResponse {
  message: string;
  code: ResponseCodes;
}

export default (): GiveStaffAccessResponse => ({
  message: 'Cet utilisateur est désormais un membre du staff',
  code: ResponseCodes.GIVE_STAFF_ACCESS_SUCCESS,
});
