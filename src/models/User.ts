 interface User {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
  token: string;
  activity: string;
}

interface UserConversation {
  _id: string;
  avatar: string;
  name: string
}


export type {UserConversation, User}
