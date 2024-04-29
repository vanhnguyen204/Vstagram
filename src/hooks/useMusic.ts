import {Music} from './../models/Music';
import {create} from 'zustand';

interface MusicsType {
  listMusic: Music[];
  musicPlaying: string;
  urlMusicPlaying: string;
}

interface MusicActions extends MusicsType {
  setListMusic: (musics: Music[]) => void;
  setMusicPlaying: (musicId: string) => void;
  setUrlMusicPlaying: (musicUrl: string) => void;
}

export const musicStore = create<MusicActions>(set => ({
  listMusic: [],
  musicPlaying: '',
  urlMusicPlaying: '',
  setListMusic: (musics: Music[]) => set({listMusic: musics}),
  setMusicPlaying: (musicId: string) => set({musicPlaying: musicId}),
  setUrlMusicPlaying: (url: string) => set({urlMusicPlaying: url}),
}));
