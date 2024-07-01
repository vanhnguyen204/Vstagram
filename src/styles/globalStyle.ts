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
  buttonStyle: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
});
