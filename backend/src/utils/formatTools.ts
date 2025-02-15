export const onlyNumber = /^[0-9]*$/;

const formatReplace = /[`!£@#$%^&*()+\-=¬[\]{};':"\\|,.<>/?~]/gi;

export const containOnlyNumbers = (text: string): boolean => {
  const onlyNumber = /^[0-9]*$/;
  const containOnlyNumbers = onlyNumber.test(text);

  return containOnlyNumbers;
};

export const removeSpecialChar = (text: string): string => {
  return text.replace(formatReplace, '');
};

export const stringToCleanArray = (str: string): string[] => {
  const splitString = str.split(',');
  return splitString.filter((s) => s !== '');
};
