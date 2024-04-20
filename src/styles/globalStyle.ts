import {StyleSheet} from 'react-native';
import {appColors} from '../assets/colors/appColors';

export const globalStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: appColors.backgroundApp,
  },
  textStyle: {
    fontSize: 14,
    color: '#fff',
  },
});
