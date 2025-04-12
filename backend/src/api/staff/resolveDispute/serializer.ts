import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface ResolveDisputeResponse {
  message: string;
  code: ResponseCodes;
}

export default (): ResolveDisputeResponse => ({
  message: 'The dispute has been resolved',
  code: ResponseCodes.RESOLVE_DISPUTE_SUCCESS,
});
