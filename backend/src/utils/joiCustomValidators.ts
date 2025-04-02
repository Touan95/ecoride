import { IssueProcessingStatus } from '../api/common/enums/IssueProcessingStatus.enum';
import validator from '../core/validator';
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

export const rideLocationValidator = validator.object({
  address: validator.string().allow(null, '').max(255).messages({
    'string.max': 'Address must be at most 255 characters long.',
  }),
  postalCode: validator
    .string()
    .allow(null, '')
    .pattern(/^\d{4,10}$/)
    .messages({
      'string.pattern.base': 'Postal code must be between 4 and 10 digits.',
    }),
  city: validator.string().allow(null, '').max(100).messages({
    'string.max': 'City must be at most 100 characters long.',
  }),
  coordinate: validator
    .object({
      latitude: validator.number().required().min(-90).max(90).messages({
        'number.min': 'Latitude must be between -90 and 90.',
        'number.max': 'Latitude must be between -90 and 90.',
      }),
      longitude: validator.number().required().min(-180).max(180).messages({
        'number.min': 'Longitude must be between -180 and 180.',
        'number.max': 'Longitude must be between -180 and 180.',
      }),
    })
    .required(),
});
