import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface BookSeatResponse {
  message: string;
  code: ResponseCodes;
}

export default (): BookSeatResponse => ({
  message: 'Vous avez réservé un siège pour ce trajet avec succès',
  code: ResponseCodes.BOOK_SEAT_SUCCESS,
});
