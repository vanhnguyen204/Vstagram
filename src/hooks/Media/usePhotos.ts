import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {create} from 'zustand';
import photos from '../../screens/Photos';
export interface PhotoSelectedType {
  id: string;
  image: string;
}
interface UsePhotosType {
  photos: PhotoIdentifier[];
  photoSelected: PhotoSelectedType[];
}

interface UsePhotosActions extends UsePhotosType {
  setPhotos: (photos: PhotoIdentifier[]) => void;
  onPhotoSelected: (photo: PhotoSelectedType) => void;
  onPhotoUnSelected: (photoId: string) => void;
  clearPhotoSelected: () => void;
}

export const usePhotos = create<UsePhotosActions>(setState => ({
  photos: [],
  photoSelected: [],
  setPhotos: (pts: PhotoIdentifier[]) => setState({photos: pts}),
  onPhotoUnSelected: (photoId: string) =>
    setState(state => ({
      photoSelected: state.photoSelected.filter(item => item.id !== photoId),
    })),
  clearPhotoSelected: () => setState({photos: []}),
  onPhotoSelected: (photo: PhotoSelectedType) =>
    setState(state => ({
      photoSelected: state.photoSelected.concat(photo),
    })),
}));
