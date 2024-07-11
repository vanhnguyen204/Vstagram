import {VideoFile} from 'react-native-vision-camera';
import {UserConversation} from '../models/User.ts';
import {MediaParams} from '../models/Media.ts';
import { ImageType } from "../hooks/Media/usePhotos.ts";

export type RootStackParams = {
  WelcomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  VerifyRegister: {email: string};
  CreatePasswordScreen: {email: string};
  BottomTab: undefined;
  Setting: undefined;
  ImageEditorScreen: {image: ImageType};
  CompleteStoryScreen: undefined;
  Capture: undefined;
  Reels: undefined;
  NewPost: {mediaType: string};
  PreviewReel: {video: VideoFile};
  Album: {mediaType: MediaParams};
  ChatStore: undefined;
  ConversationDetails: {userInfor: UserConversation};
};
