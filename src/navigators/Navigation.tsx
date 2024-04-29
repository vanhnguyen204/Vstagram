import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register.tsx';
import WelcomeScreen from '../screens/WelcomeScreen/index.tsx';
import {PageName} from '../config/PageName.ts';
import {screenOptions} from '../utils/NavigationUtils.ts';
import VerifyRegister from '../screens/Auth/VerifyRegister.tsx';
import CreatePasswordScreen from '../screens/Auth/CreatePasswordScreen.tsx';
import Login from '../screens/Auth/Login.tsx';
import HomeScreen from '../screens/HomeScreen/index.tsx';
import BottomTab from './BottomTab.tsx';
import PostEditorScreen from '../screens/PostEditorScreen';
import CompleteStoryScreen from '../screens/CompleteStoryScreen/index.tsx';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={PageName.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={PageName.Login} component={Login} />
      <Stack.Screen name={PageName.Register} component={Register} />
      <Stack.Screen name={PageName.VerifyRegister} component={VerifyRegister} />
      <Stack.Screen
        name={PageName.CreatePasswordScreen}
        component={CreatePasswordScreen}
      />
      <Stack.Screen name={PageName.BottomTab} component={BottomTab} />
      <Stack.Screen
        name={PageName.PostEditorScreen}
        component={PostEditorScreen}
      />
      <Stack.Screen
        name={PageName.CompleteStoryScreen}
        component={CompleteStoryScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
