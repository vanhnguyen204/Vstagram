import {
  createNavigationContainerRef,
  StackActions,
  NavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import { RootStackParams } from "../navigators";

// Tạo tham chiếu navigation container
const navigationRef = createNavigationContainerRef();

// Export tham chiếu navigation container để sử dụng ở các file khác
export {navigationRef};

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};
export const navigate = <RouteName extends keyof RootStackParams>(
  name: RouteName,
  params?: RootStackParams[RouteName],
) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
};

export const navigatePush = <RouteName extends keyof RootStackParams>(
  name: RouteName,
  params?: RootStackParams[RouteName],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const navigateAndReset = (
  routes: Array<{name: keyof RootStackParams; params?: any}>,
  index: number = 0,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: routes.map(route => ({name: route.name, params: route.params})),
      }),
    );
  }
};

export function navigateReplace<RouteName extends keyof RootStackParams>(
  name: RouteName,
  params?: RootStackParams[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export const goBackNavigation = () => {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};
