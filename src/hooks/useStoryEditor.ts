import {create} from 'zustand';

interface UseStoryEditorType {
  stickers: string[];
  isModalStickerShow: boolean;
  isModalMusicShow: boolean;
  textColor: string;
  font: string;
  fontSize: number;
}

interface UseStoryEditorActions extends UseStoryEditorType {
  setSticker: (sticker: string) => void;
  clearStickerStory: () => void;
  toggleModalSticker: (isVisible: boolean) => void;
  toggleModalMusic: (isVisible: boolean) => void;
  setTextColor: (color: string) => void;
  setFont: (font: string) => void;
  setFontSize: (fontSize: number) => void;
}
export const useStoryStore = create<UseStoryEditorActions>(set => ({
  stickers: [],
  isModalStickerShow: false,
  isModalMusicShow: false,
  textColor: '#fff',
  font: '',
  fontSize: 14,
  setSticker: (sticker: string) =>
    set(state => ({stickers: [...state.stickers, sticker]})),
  clearStickerStory: () => set(() => ({stickers: []})),
  toggleModalSticker: (isVisible: boolean) =>
    set(() => ({isModalStickerShow: isVisible})),
  toggleModalMusic: (isVisible: boolean) => set({isModalMusicShow: isVisible}),
  setTextColor: (color: string) => set({textColor: color}),
  setFont: (font: string) => set({font: font}),
  setFontSize: (fontSize: number) => set({fontSize}),
}));
