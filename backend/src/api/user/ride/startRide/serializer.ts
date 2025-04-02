import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface StartRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): StartRideResponse => ({
  message: 'You have started this ride with success',
  code: ResponseCodes.START_RIDE_SUCCESS,
});
