import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface AddCarResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AddCarResponse => ({
  message: 'Le véhicule a été créé avec succès',
  code: ResponseCodes.CREATE_CAR_SUCCESS,
});
