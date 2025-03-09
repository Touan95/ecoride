import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface DeleteCarResponse {
  message: string;
  code: ResponseCodes;
}

export default (): DeleteCarResponse => ({
  message: 'Le véhicule à été supprimé avec succès',
  code: ResponseCodes.DELETE_CAR_SUCCESS,
});
