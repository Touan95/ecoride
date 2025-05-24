import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface ApproveReviewResponse {
  message: string;
  code: ResponseCodes;
}

export default (): ApproveReviewResponse => ({
  message: "L'avis a été approuvé avec succès",
  code: ResponseCodes.APPROVE_REVIEW_SUCCESS,
});
