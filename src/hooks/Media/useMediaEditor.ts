import {ImageType, VideoType} from './usePhotos.ts';
import {create} from 'zustand';

interface MediaType {
  imageSelected: ImageType[];
  videoSelected: VideoType;
}

interface MediaActions extends MediaType {
  onImageSelected: (photo: ImageType, multiple: boolean) => void;
  onImageUnSelected: (photoId: string) => void;
  clearImageSelected: () => void;
  onVideoSelected: (video: VideoType) => void;
  clearVideoSelected: () => void;
  updateImage: (id: string, newImage: string) => void;
}

const useMediaEditor = create<MediaActions>(set => ({
  imageSelected: [],
  videoSelected: {
    duration: 0,
    type: '',
    uri: '',
    name: '',
    id: '',
  },
  //handle video
  onVideoSelected: (video: VideoType) => set({videoSelected: video}),
  clearVideoSelected: () =>
    set(state => {
      if (state.videoSelected.id) {
        return {
          videoSelected: {
            duration: 0,
            type: '',
            uri: '',
            name: '',
            id: '',
          },
        };
      }
      return state;
    }),
  onImageUnSelected: (photoId: string) =>
    set(state => ({
      imageSelected: state.imageSelected.filter(item => item.id !== photoId),
    })),
  clearImageSelected: () =>
    set(state => {
      if (state.imageSelected.length > 0) {
        return {imageSelected: []};
      }
      return state;
    }),
  onImageSelected: (photo: ImageType, multiple: boolean) =>
    set(state => ({
      imageSelected: multiple ? state.imageSelected.concat(photo) : [photo],
    })),
  updateImage: (id: string, newImage: string) =>
    set(state => ({
      imageSelected: state.imageSelected.map(item => {
        if (item.id === id) {
          item.uri = newImage;
        }
        return item;
      }),
    })),
}));

export {useMediaEditor};
