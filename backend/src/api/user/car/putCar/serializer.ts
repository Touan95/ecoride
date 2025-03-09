import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface PutCarResponse {
  message: string;
  code: ResponseCodes;
}

export default (): PutCarResponse => ({
  message: 'The car has been updated',
  code: ResponseCodes.UPDATE_CAR_SUCCESS,
});
