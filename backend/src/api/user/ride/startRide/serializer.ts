import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface StartRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): StartRideResponse => ({
  message: 'Vous avez démarré ce trajet avec succès',
  code: ResponseCodes.START_RIDE_SUCCESS,
});
