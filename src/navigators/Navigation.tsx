import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register.tsx';
import WelcomeScreen from '../screens/WelcomeScreen/index.tsx';
import {PageName} from '../config/PageName.ts';
import {screenOptions} from '../utils/NavigationUtils.ts';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={PageName.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={PageName.Register} component={Register} />
    </Stack.Navigator>
  );
};

export default Navigation;
