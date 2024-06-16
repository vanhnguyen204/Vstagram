import {create} from 'zustand';

interface AppStoreType {
  isLoading: boolean;
}

interface AppStoreActions extends AppStoreType {
  setIsLoading: (value: boolean) => void;
}
export const useAppStore = create<AppStoreActions>(set => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set({isLoading: value}),
}));
