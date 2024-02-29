type WebResponse<T> = WebSuccessResponse<T> | WebFailureResponse;

interface WebSuccessResponse<T> {
  isSuccess: true;
  data: T;
}
interface WebFailureResponse {
  isSuccess: false;
  errorMessage: string;
}
