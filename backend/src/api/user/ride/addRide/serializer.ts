import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface AddRideResponse {
  message: string;
  code: ResponseCodes;
  rideId: string;
}

export default (rideId: string): AddRideResponse => ({
  message: 'Le trajet a été créé avec succès',
  code: ResponseCodes.CREATE_RIDE_SUCCESS,
  rideId,
});
