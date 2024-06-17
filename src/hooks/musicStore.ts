import {Music} from './../models/Music';
import {create} from 'zustand';
import {MusicResponse} from '../models/MusicResponse.ts';

interface MusicsType {
  musics: MusicResponse;
  musicPlaying: string;
  urlMusicPlaying: string;
}

interface MusicActions extends MusicsType {
  setMusics: (musics: MusicResponse) => void;
  setMusicPlaying: (musicId: string) => void;
  setUrlMusicPlaying: (musicUrl: string) => void;
}

export const musicStore = create<MusicActions>(set => ({
  musics: {
    data: [],
    limit: 0,
    page: 0,
    nextPage: 0,
    prevPage: 0,
  },
  musicPlaying: '',
  urlMusicPlaying: '',
  setMusics: (musics: MusicResponse) =>
    set(state => ({
      musics: {
        ...state.musics,
        data: state.musics.data.concat(...musics.data),
        limit: musics.limit,
        nextPage: musics.nextPage,
        prevPage: musics.prevPage,
        page: musics.page,
      },
    })),
  setMusicPlaying: (musicId: string) => set({musicPlaying: musicId}),
  setUrlMusicPlaying: (url: string) => set({urlMusicPlaying: url}),
}));
