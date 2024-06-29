import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {create} from 'zustand';
import photos from '../../screens/Photos';
export interface ImageType {
  id: string;
  uri: string;
  type: string;
  name: string;
}
export interface VideoType {
  id: string;
  uri: string;
  type: string;
  name: string;
  duration: number;
}
interface UsePhotosType {
  photos: PhotoIdentifier[];
  imageSelected: ImageType[];
  videoSelected: VideoType;
  images: PhotoIdentifier[];
  videos: PhotoIdentifier[];
}

interface UsePhotosActions extends UsePhotosType {
  setPhotos: (photos: PhotoIdentifier[]) => void;
  onImageSelected: (photo: ImageType) => void;
  onImageUnSelected: (photoId: string) => void;
  clearImageSelected: () => void;
  onVideoSelected: (video: VideoType) => void;
  clearVideoSelected: () => void;
}

export const usePhotos = create<UsePhotosActions>(setState => ({
  photos: [],
  videos: [],
  images: [],
  imageSelected: [],
  videoSelected: {
    duration: 0,
    type: '',
    uri: '',
    name: '',
    id: '',
  },
  //All photo
  setPhotos: (pts: PhotoIdentifier[]) => setState({photos: pts}),
  // handle videos
  onVideoSelected: (video: VideoType) => setState({videoSelected: video}),
  clearVideoSelected: () =>
    setState({
      videoSelected: {
        duration: 0,
        type: '',
        uri: '',
        name: '',
        id: '',
      },
    }),
  // handle images
  onImageUnSelected: (photoId: string) =>
    setState(state => ({
      imageSelected: state.imageSelected.filter(item => item.id !== photoId),
    })),
  clearImageSelected: () => setState({photos: []}),
  onImageSelected: (photo: ImageType) =>
    setState(state => ({
      imageSelected: state.imageSelected.concat(photo),
    })),
}));
