import {Music} from './../models/Music';
import {create} from 'zustand';
import {MusicResponse} from '../models/MusicResponse.ts';

interface MusicsType {
  musics: MusicResponse;
  musicPlaying: Music;
}

interface MusicActions extends MusicsType {
  setMusics: (musics: MusicResponse) => void;
  setMusicPlaying: (music: Music) => void;
  clearMusicPlaying: () => void;
}

export const musicStore = create<MusicActions>(set => ({
  musics: {
    data: [],
    limit: 0,
    page: 0,
    nextPage: 0,
    prevPage: 0,
  },
  musicPlaying: {
    _id: '',
    image: '',
    artist: '',
    title: '',
    urlMedia: '',
  },
  setMusics: (musics: MusicResponse) =>
    set(state => ({
      musics: {
        // ...state.musics,
        data: state.musics.data.concat(...musics.data),
        limit: musics.limit,
        nextPage: musics.nextPage,
        prevPage: musics.prevPage,
        page: musics.page,
      },
    })),
  setMusicPlaying: (music: Music) => set({musicPlaying: music}),
  clearMusicPlaying: () =>
    set({
      musicPlaying: {
        _id: '',
        image: '',
        artist: '',
        title: '',
        urlMedia: '',
      },
    }),
}));
