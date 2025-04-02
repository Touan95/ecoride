import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface EndRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): EndRideResponse => ({
  message: 'You have ended this ride with success',
  code: ResponseCodes.END_RIDE_SUCCESS,
});
