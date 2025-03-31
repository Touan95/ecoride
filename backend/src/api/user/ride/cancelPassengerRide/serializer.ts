import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface CancelPassengerRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): CancelPassengerRideResponse => ({
  message: 'You have cancelled your booking for this ride with success',
  code: ResponseCodes.CANCEL_BOOKING_SUCCESS,
});
