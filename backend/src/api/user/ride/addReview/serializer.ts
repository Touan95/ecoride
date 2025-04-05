import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface AddReviewResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AddReviewResponse => ({
  message: 'The review has been added',
  code: ResponseCodes.ADD_REVIEW_SUCCESS,
});
