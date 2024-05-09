import {create} from 'zustand';
interface UserInforType {
  information: object;
}

interface UserInforActions extends UserInforType {
  setInformation: (data: object) => void;
}

export const userInforStore = create<UserInforActions>(set => ({
  information: {},
  setInformation: (information: object): void => set({information}),
}));
