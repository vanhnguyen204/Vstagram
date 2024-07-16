import {VideoFile} from 'react-native-vision-camera';
import {UserConversation} from '../models/User.ts';
import {MediaParams} from '../models/Media.ts';
import { ImageType, VideoType } from "../hooks/Media/usePhotos.ts";
import {PostType} from '../models/Post.ts';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  VerifyRegister: {email: string};
  CreatePasswordScreen: {email: string};
  BottomTab: undefined;
  Setting: undefined;
  ImageEditorScreen: {image: ImageType; type: 'CREATE_STORY' | 'EDIT_IMAGE'};
  CompleteStoryScreen: undefined;
  Capture: undefined;
  Reels: undefined;
  ReelEditorScreen: {video: VideoType};
  PostEditorScreen: {mediaType: PostType};
  PreviewReel: {video: VideoFile};
  Album: {mediaType: MediaParams};
  ChatStore: undefined;
  ConversationDetails: {userInfor: UserConversation};
};
