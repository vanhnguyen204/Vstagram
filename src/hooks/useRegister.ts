import {create} from 'zustand';

interface RegisterType {
  fullName: string;
  email: string;
  passWord: string;
  confirmPassword: string;
  errorPassword: string;
  errorConfirmPassword: string;
}

interface RegisterActions extends RegisterType {
  setFullName: (fullName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setErrorPassword: (value: string) => void;
  setErrorConfirmPassword: (value: string) => void;
}
export const useRegisterStore = create<RegisterActions>(set => ({
  fullName: '',
  email: '',
  passWord: '',
  confirmPassword: '',
  errorPassword: '',
  errorConfirmPassword: '',
  setFullName: (fullName: string) => set({fullName}),
  setEmail: (email: string) => set({email}),
  setPassword: (passWord: string) => set({passWord}),
  setConfirmPassword: (confirmPassword: string) => set({confirmPassword}),
  setErrorPassword: (errorPassword: string) => set({errorPassword}),
  setErrorConfirmPassword: (errorConfirmPassword: string) =>
    set({errorConfirmPassword}),
}));
