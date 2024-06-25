import {RootStackParams} from './RootStackParams.ts';

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
  Home: 'Home' as keyof  RootStackParams,
  Search: 'Search' as keyof RootStackParams,
  Reels: 'Reels' as keyof RootStackParams,
  Setting: 'Setting' as keyof RootStackParams,
  CreatePost: 'CreatePost' as keyof RootStackParams,
};
