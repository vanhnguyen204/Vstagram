import {Dimensions, Platform} from 'react-native';

export const AppInfor = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  appIcon: require('../assets/icons/icon-app.png'),
  textApp: require('../assets/icons/text-app.png'),
};
