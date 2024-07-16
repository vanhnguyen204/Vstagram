export interface Chat {
  _id: string;
  userIdSent: string;
  userIdReceived: string;
  message: string | string[];
  timeChat: string;
}

export interface Conversation {
  userId: string;
  userAvatar: string;
  messageLatest: string;
  timeMessage: string;
  fullName: string;
}
