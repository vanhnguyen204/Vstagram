import {VideoFile} from 'react-native-vision-camera';

export type BottomTabParams = {
  Home: undefined;
  Search: undefined;
  Album: {mediaType: string};
  Reel: undefined;
  Setting: undefined;
};
