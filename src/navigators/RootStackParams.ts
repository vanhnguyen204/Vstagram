import {VideoFile} from 'react-native-vision-camera';
import { ConversationType, OnlineUserType } from "../hooks/useChatStore.ts";
import { UserConversation } from "../models/User.ts";

export type RootStackParams = {
  WelcomeScreen: undefined;
  Login: undefined;
  Register: undefined;
  VerifyRegister: {email: string};
  CreatePasswordScreen: {email: string};
  BottomTab: undefined;
  Setting: undefined;
  PostEditorScreen: undefined;
  CompleteStoryScreen: undefined;
  Capture: undefined;
  Reels: undefined;
  NewPost: {mediaType: string};
  PreviewReel: {video: VideoFile};
  Album: {mediaType: string};
  ChatStore: undefined;
  ConversationDetails: {userInfor: UserConversation}
};
