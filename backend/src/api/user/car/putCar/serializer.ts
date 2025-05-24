import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface PutCarResponse {
  message: string;
  code: ResponseCodes;
}

export default (): PutCarResponse => ({
  message: 'Le véhicule a été mis à jour avec succès',
  code: ResponseCodes.UPDATE_CAR_SUCCESS,
});
