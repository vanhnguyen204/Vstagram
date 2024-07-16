import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {create} from 'zustand';
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
interface PhotosType {
  photos: PhotoIdentifier[];
  images: PhotoIdentifier[];
  videos: PhotoIdentifier[];
}

interface PhotosActions extends PhotosType {
  setPhotos: (photos: PhotoIdentifier[]) => void;
  setImages: (images: PhotoIdentifier[]) => void;
  setVideos: (videos: PhotoIdentifier[]) => void;
}

export const usePhotos = create<PhotosActions>(setState => ({
  photos: [],
  videos: [],
  images: [],
  setPhotos: (pts: PhotoIdentifier[]) => setState({photos: pts}),
  setVideos: (videos: PhotoIdentifier[]) => setState({videos}),
  setImages: (images: PhotoIdentifier[]) => setState({images}),
}));
