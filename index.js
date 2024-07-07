/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to be used
  console.log('TrackPlayer is ready');
});

// TrackPlayer.registerPlaybackService(() => require('./service'));


PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  channelId: '1',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

PushNotification.setApplicationIconBadgeNumber(2)
