import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface AddRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AddRideResponse => ({
  message: 'The ride has been created',
  code: ResponseCodes.CREATE_RIDE_SUCCESS,
});
