import {create} from 'zustand';
import {Music} from '../models';
import ModalMusic from '../screens/PostEditorScreen/components/ModalMusic.tsx';

interface StoryEditorType {
  stickers: string[];
  isModalStickerShow: boolean;
  isModalMusicShow: boolean;
  textColor: string;
  font: string;
  fontSize: number;
  musicSelected: Music;
}

interface StoryEditorActions extends StoryEditorType {
  setStickers: (sticker: string) => void;
  clearStickerStory: () => void;
  addMusic: (music: Music) => void;
  toggleModalSticker: (isVisible: boolean) => void;
  toggleModalMusic: (isVisible: boolean) => void;
  setTextColor: (color: string) => void;
  setFont: (font: string) => void;
  setFontSize: (fontSize: number) => void;
}
export const useStoryEditor = create<StoryEditorActions>(set => ({
  stickers: [],
  isModalStickerShow: false,
  isModalMusicShow: false,
  textColor: '#fff',
  font: '',
  fontSize: 14,
  musicSelected: {
    _id: '',
    title: '',
    urlMedia: '',
    image: '',
    artist: '',
  },
  addMusic: (music: Music) => set({musicSelected: music}),
  setStickers: (sticker: string) =>
    set(state => ({stickers: [...state.stickers, sticker]})),
  clearStickerStory: () => set(() => ({stickers: []})),
  toggleModalSticker: (isVisible: boolean) =>
    set(() => ({isModalStickerShow: isVisible})),
  toggleModalMusic: (isVisible: boolean) => set({isModalMusicShow: isVisible}),
  setTextColor: (color: string) => set({textColor: color}),
  setFont: (font: string) => set({font: font}),
  setFontSize: (fontSize: number) => set({fontSize}),
}));
