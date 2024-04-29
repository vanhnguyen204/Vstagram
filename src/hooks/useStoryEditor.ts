import {create} from 'zustand';

interface UseStoryEditorType {
  stickers: string[];
  isModalStickerShow: boolean;
  isModalMusicShow: boolean;
}

interface UseStoryEditorActions extends UseStoryEditorType {
  setSticker: (sticker: string) => void;
  clearStickerStory: () => void;
  toggleModalSticker: (isVisible: boolean) => void;
  toggleModalMusic: (isVisible: boolean) => void;
}
export const useStoryStore = create<UseStoryEditorActions>(set => ({
  stickers: [],
  isModalStickerShow: false,
  isModalMusicShow: false,
  setSticker: (sticker: string) =>
    set(state => ({stickers: [...state.stickers, sticker]})),
  clearStickerStory: () => set(() => ({stickers: []})),
  toggleModalSticker: (isVisible: boolean) =>
    set(() => ({isModalStickerShow: isVisible})),
  toggleModalMusic: (isVisible: boolean) => set({isModalMusicShow: isVisible}),
}));
