import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface ApproveReviewResponse {
  message: string;
  code: ResponseCodes;
}

export default (): ApproveReviewResponse => ({
  message: 'The review has been approved',
  code: ResponseCodes.APPROVE_REVIEW_SUCCESS,
});
