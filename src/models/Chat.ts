export interface Chat {
  _id: string;
  userIdSent: string;
  userIdReceived: string;
  message: string | string[];
  timeChat: string;
}
