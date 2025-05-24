import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface CancelDriverRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): CancelDriverRideResponse => ({
  message: 'Vous avez annulé votre trajet avec succès',
  code: ResponseCodes.CANCEL_RIDE_SUCCESS,
});
