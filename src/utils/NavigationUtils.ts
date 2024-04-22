import {StackActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

const navigationStack = useNavigation();

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

interface NavigationParams {
  [key: string]: any;
}

export const navigate = (name: string, params?: NavigationParams) => {
  // @ts-ignore
  navigationStack.navigate(name, params);
};

export const navigatePush = (name: string, params: NavigationParams) => {
  navigationStack.dispatch(StackActions.push(name, params));
};

export const navigateAndReset = (routes: string[], index: number = 0) => {};

export function navigateReplace(name: string, param: NavigationParams) {
  navigationStack.dispatch(StackActions.replace(name, param));
}

export const goBack = () => {
  navigationStack.goBack();
};
