import { IssueProcessingStatus } from '../api/common/enums/IssueProcessingStatus.enum';
import { containOnlyNumbers, stringToCleanArray } from './formatTools';

export const validateStringWithOnlyNumber = (value: string): number => {
  const validString = !containOnlyNumbers(value);

  if (validString) {
    return parseInt(value);
  }
  throw new Error('not a number');
};

export function validateStatus(str: string): string {
  const newSpl = stringToCleanArray(str);
  for (const s of newSpl) {
    if (!Object.values(IssueProcessingStatus).includes(s as IssueProcessingStatus)) {
      throw new Error(`${s} is not a good status`);
    }
  }
  return str;
}
