type ValidationErrors = {
  name: string;
  message: string;
  path: string[];
  type: string;
}[];

export type BaseError = {
  name: string;
  message: string;
  type: string;
};

export const createValidationErrors = (errors: BaseError[]): ValidationErrors => {
  return errors.map((error) => {
    return {
      name: error.name,
      message: error.message,
      path: ['body', error.name],
      type: error.type,
    };
  });
};
