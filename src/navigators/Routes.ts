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
};
