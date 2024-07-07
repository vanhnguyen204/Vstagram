import {create} from 'zustand';
import {User} from '../models/User.ts';
interface UserInforType {
  information: User;
}

interface UserInforActions extends UserInforType {
  setInformation: (data: User) => void;
}

export const useUserInformation = create<UserInforActions>(set => ({
  information: {
    _id: '',
    token: '',
    avatar: '',
    email: '',
    fullName: '',
    activity: ''
  },
  setInformation: (information: User): void => set({information}),
}));
