export interface BaseAPIResponse {
  message: string;
  code: string;
}

export interface ValidationError {
  name: string;
  message: string;
}

export interface ErrorResponse extends BaseAPIResponse {
  statusCode: number;
  context?: {
    validationErrors?: ValidationError[];
  };
}
