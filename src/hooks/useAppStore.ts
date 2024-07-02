import {create} from 'zustand';

interface AppStoreType {
  visibleModalLoading: boolean;
}

interface AppStoreActions extends AppStoreType {
  setIsLoading: (value: boolean) => void;
}
const useAppStore = create<AppStoreActions>(set => ({
  visibleModalLoading: false,
  setIsLoading: (value: boolean) => set({visibleModalLoading: value}),
}));

const showModalLoading = () => {
  useAppStore.getState().setIsLoading(true);
};
const hiddenModalLoading = () => {
  useAppStore.getState().setIsLoading(false);
};

export {useAppStore, showModalLoading, hiddenModalLoading};
