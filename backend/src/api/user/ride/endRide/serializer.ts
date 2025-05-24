import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface EndRideResponse {
  message: string;
  code: ResponseCodes;
}

export default (): EndRideResponse => ({
  message: 'Vous avez finalisé ce trajet avec succès',
  code: ResponseCodes.END_RIDE_SUCCESS,
});
