import {BottomTabParams} from '../navigators/BottomTabParams.ts';


export const iconBottomTab: {[key in keyof BottomTabParams]: any} = {
  Home: require('../assets/icons/home.png'),
  Search: require('../assets/icons/search-interface-symbol.png'),
  EmptyScreen: require('../assets/icons/plus.png'),
  Reels: require('../assets/icons/video.png'),
  Setting: require('../assets/icons/user.png'),
};
