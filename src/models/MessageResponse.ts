export interface MessageResponse<T> {
  status: string;
  message: string;
  code: number;
  data: T;
}
