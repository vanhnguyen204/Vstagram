import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register.tsx';
import WelcomeScreen from '../screens/WelcomeScreen/index.tsx';
import {screenOptions} from '../utils/NavigationUtils.ts';
import VerifyRegister from '../screens/Auth/VerifyRegister.tsx';
import CreatePasswordScreen from '../screens/Auth/CreatePasswordScreen.tsx';
import Login from '../screens/Auth/Login.tsx';
import BottomTab from './BottomTab.tsx';

import CompleteStoryScreen from '../screens/CompleteStoryScreen/index.tsx';
import {RootStackParams} from './RootStackParams.ts';
import {ROUTES} from './Routes.ts';
import Capture from '../screens/Capture';
import PreviewReel from '../screens/PreviewReel';
import Album from '../screens/Album';
import PostEditorScreen from '../screens/PostEditorScreen';
import ChatStore from '../screens/ChatStoreScreen';
import ConversationDetails from '../screens/ConversationDetails';
import ImageEditorScreen from '../screens/ImageEditorScreen';
import ReelEditorScreen from '../screens/ReelEditorScreen';

const Stack = createNativeStackNavigator<RootStackParams>();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.Login} component={Login} />
      <Stack.Screen name={ROUTES.Register} component={Register} />
      {/*@ts-ignore*/}
      <Stack.Screen name={ROUTES.VerifyRegister} component={VerifyRegister} />
      <Stack.Screen
        name={ROUTES.CreatePasswordScreen}
        component={CreatePasswordScreen}
      />
      <Stack.Screen name={ROUTES.BottomTab} component={BottomTab} />
      <Stack.Screen
        name={ROUTES.ImageEditorScreen}
        component={ImageEditorScreen}
      />
      <Stack.Screen
        name={ROUTES.CompleteStoryScreen}
        component={CompleteStoryScreen}
      />
      <Stack.Screen name={ROUTES.Capture} component={Capture} />
      <Stack.Screen name={ROUTES.PreviewReel} component={PreviewReel} />
      <Stack.Screen name={ROUTES.Album} component={Album} />
      <Stack.Screen
        name={ROUTES.PostEditorScreen}
        component={PostEditorScreen}
      />
      <Stack.Screen name={ROUTES.ChatStore} component={ChatStore} />
      <Stack.Screen
        name={ROUTES.ConversationDetails}
        component={ConversationDetails}
      />
      <Stack.Screen
        name={ROUTES.ReelEditorScreen}
        component={ReelEditorScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
