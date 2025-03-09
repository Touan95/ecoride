import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface AddCarResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AddCarResponse => ({
  message: 'The car has been created',
  code: ResponseCodes.CREATE_CAR_SUCCESS,
});
