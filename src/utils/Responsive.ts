import {Dimensions, StatusBar} from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// const {width, height} = Dimensions.get('window');

const {height: deviceHeight} = Dimensions.get('screen');
const statusBarHeight = StatusBar.currentHeight ?? 0;

const screenHeightIncludeNavBar = deviceHeight - statusBarHeight;
export {screenHeightIncludeNavBar, statusBarHeight};
