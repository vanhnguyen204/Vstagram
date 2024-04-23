import {create} from 'zustand';

interface LoginType {
  email: string;
  passWord: string;
  errorEmail: string;
  errorPassword: string;
}

interface LoginActions extends LoginType {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorPassword: (value: string) => void;
  setErrorEmail: (value: string) => void;
}

export const useLoginStore = create<LoginActions>(set => ({
  email: '',
  passWord: '',
  errorEmail: '',
  errorPassword: '',
  setEmail: (email: string) => set({email}),
  setPassword: (passWord: string) => set({passWord}),
  setErrorPassword: (errorPassword: string) => set({errorPassword}),
  setErrorEmail: (errorEmail: string) => set({errorEmail}),
}));
