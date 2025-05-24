import { ResponseCodes } from '../../common/enums/responseCodes.enum';

export interface DriverPreferencesChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): DriverPreferencesChangedResponse => ({
  message: 'Les préférences du conducteur ont été modifiées avec succès',
  code: ResponseCodes.DRIVER_PREFERENCES_CHANGE_SUCCESS,
});
