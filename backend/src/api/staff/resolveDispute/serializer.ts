import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface ResolveDisputeResponse {
  message: string;
  code: ResponseCodes;
}

export default (): ResolveDisputeResponse => ({
  message: 'Le litige a été résolu avec succès',
  code: ResponseCodes.RESOLVE_DISPUTE_SUCCESS,
});
