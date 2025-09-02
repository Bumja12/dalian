export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
