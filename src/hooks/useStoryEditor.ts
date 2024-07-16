import {create} from 'zustand';
import {Music} from '../models';
import ModalMusic from '../screens/ImageEditorScreen/components/ModalMusic.tsx';
export interface TextElement {
  id: string;
  value: string;
  color: string;
  size: number;
  font: string;
}
interface StoryEditorType {
  stickerSelected: string[];
  texts: TextElement[];
  isModalStickerShow: boolean;
  isModalMusicShow: boolean;
  textColor: string;
  font: string;
  fontSize: number;
  musicSelected: Music;
}

interface StoryEditorActions extends StoryEditorType {
  addMusic: (music: Music) => void;
  toggleModalMusic: (isVisible: boolean) => void;
  //sticker handler
  setStickers: (sticker: string) => void;
  clearStickerStory: () => void;
  toggleModalSticker: (isVisible: boolean) => void;
  handleRemoveSticker: (sticker: string) => void;
  //text handler
  setTextColor: (color: string) => void;
  setFont: (font: string) => void;
  setFontSize: (fontSize: number) => void;

  addNewText: (textElement: TextElement) => void;
  updateText: (textElement: TextElement) => void;
  removeText: (textId: string) => void;
}
export const useStoryEditor = create<StoryEditorActions>(set => ({
  stickerSelected: [],
  texts: [],
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
  handleRemoveSticker: sticker =>
    set(state => ({
      stickerSelected: state.stickerSelected.filter(item => item !== sticker),
    })),
  setStickers: (sticker: string) =>
    set(state => ({stickerSelected: [...state.stickerSelected, sticker]})),
  clearStickerStory: () => set({stickerSelected: []}),
  toggleModalSticker: (isVisible: boolean) =>
    set(() => ({isModalStickerShow: isVisible})),
  toggleModalMusic: (isVisible: boolean) => set({isModalMusicShow: isVisible}),
  setTextColor: (color: string) => set({textColor: color}),
  setFont: (font: string) => set({font: font}),
  setFontSize: (fontSize: number) => set({fontSize}),
  addNewText: (textElement: TextElement) =>
    set(state => ({
      texts: state.texts.concat(textElement),
    })),
  updateText: textElement =>
    set(state => ({
      texts: state.texts.map(item => {
        if (textElement.id === item.id) {
          return textElement;
        }
        return item;
      }),
    })),
  removeText: textId =>
    set(state => ({
      texts: state.texts.filter(item => item.id !== textId),
    })),
}));
