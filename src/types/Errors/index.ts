export interface ErrorType {
  data: {
    message: string;
    status_code: number;
    errors: {
      [key: string]: string[];
    };
  };
}
