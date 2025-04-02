import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface CancelDriverRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): CancelDriverRideResponse => ({
  message: 'You have cancelled your ride with success',
  code: ResponseCodes.CANCEL_RIDE_SUCCESS,
});
