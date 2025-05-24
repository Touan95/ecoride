import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface AddReviewResponse {
  message: string;
  code: ResponseCodes;
}

export default (): AddReviewResponse => ({
  message: "L'avis a été ajouté avec succès",
  code: ResponseCodes.ADD_REVIEW_SUCCESS,
});
