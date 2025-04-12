import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface GiveStaffAccessResponse {
  message: string;
  code: ResponseCodes;
}

export default (): GiveStaffAccessResponse => ({
  message: 'The user is now a staff member',
  code: ResponseCodes.GIVE_STAFF_ACCESS_SUCCESS,
});
