import {create} from 'zustand';
interface UserInforType {
  information: object;
}

interface UserInforActions extends UserInforType {
  setInforMation: (data: object) => void;
}

export const userInforStore = create<UserInforActions>(set => ({
  information: {},
  setInforMation: (information: object): void => set({information}),
}));
