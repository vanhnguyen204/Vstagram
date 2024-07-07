import {RootStackParams} from './RootStackParams.ts';
import {BottomTabParams} from './BottomTabParams.ts';

export const ROUTES = {
  WelcomeScreen: 'WelcomeScreen' as keyof RootStackParams,
  Login: 'Login' as keyof RootStackParams,
  Register: 'Register' as keyof RootStackParams,
  VerifyRegister: 'VerifyRegister' as keyof RootStackParams,
  CreatePasswordScreen: 'CreatePasswordScreen' as keyof RootStackParams,
  BottomTab: 'BottomTab' as keyof RootStackParams,
  PostEditorScreen: 'PostEditorScreen' as keyof RootStackParams,
  CompleteStoryScreen: 'CompleteStoryScreen' as keyof RootStackParams,
  Capture: 'Capture' as keyof RootStackParams,
  PreviewReel: 'PreviewReel' as keyof RootStackParams,
  NewPost: 'NewPost' as keyof RootStackParams,
  Album: 'Album' as keyof RootStackParams,
  ChatStore: 'ChatStore' as keyof RootStackParams,
  ConversationDetails: 'ConversationDetails' as keyof RootStackParams,
  Home: 'Home' as keyof BottomTabParams,
  Search: 'Search' as keyof BottomTabParams,
  Reels: 'Reels' as keyof BottomTabParams,
  Setting: 'Setting' as keyof BottomTabParams,
  EmptyScreen: 'EmptyScreen' as keyof BottomTabParams,
};
