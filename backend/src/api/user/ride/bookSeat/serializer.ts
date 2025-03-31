import { ResponseCodes } from '../../../common/enums/responseCodes.enum';

export interface BookSeatResponse {
  message: string;
  code: ResponseCodes;
}

export default (): BookSeatResponse => ({
  message: 'You have booked a seat for this ride with success',
  code: ResponseCodes.BOOK_SEAT_SUCCESS,
});
