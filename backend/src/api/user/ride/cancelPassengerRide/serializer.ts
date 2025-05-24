import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface CancelPassengerRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): CancelPassengerRideResponse => ({
  message: 'Vous avez annulé votre réservation pour ce trajet avec succès',
  code: ResponseCodes.CANCEL_BOOKING_SUCCESS,
});
