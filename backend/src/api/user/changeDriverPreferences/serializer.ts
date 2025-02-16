import { ResponseCodes } from "../../common/enums/responseCodes.enum";

export interface DriverPreferencesChangedResponse {
  message: string;
  code: ResponseCodes;
}

export default (): DriverPreferencesChangedResponse => ({
  message: "The user's driver preferences have been changed",
  code: ResponseCodes.DRIVER_PREFERENCES_CHANGE_SUCCESS,
});
