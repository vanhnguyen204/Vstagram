import {Music} from './../models/Music';
import {create} from 'zustand';

interface MusicsType {
  musics: Music[];
  musicPlaying: string;
  urlMusicPlaying: string;
}

interface MusicActions extends MusicsType {
  setListMusic: (musics: Music[]) => void;
  addNewMusic: (music: Music) => void;
  setMusicPlaying: (musicId: string) => void;
  setUrlMusicPlaying: (musicUrl: string) => void;
}

export const musicStore = create<MusicActions>(set => ({
  musics: [],
  musicPlaying: '',
  urlMusicPlaying: '',
  setListMusic: (musics: Music[]) => set({musics: musics}),
  setMusicPlaying: (musicId: string) => set({musicPlaying: musicId}),
  setUrlMusicPlaying: (url: string) => set({urlMusicPlaying: url}),
  addNewMusic: (music: Music) =>
    set(state => ({
      musics: [...state.musics, music],
    })),
}));
