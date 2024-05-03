import TrackPlayer from 'react-native-track-player';
import {Alert} from 'react-native';
module.exports = async function () {
  try {
    await TrackPlayer.setupPlayer();
    console.log('TrackPlayer setup completed');

    console.log('Playback started');
  } catch (error) {
    console.error('Failed to start TrackPlayer', error);
    Alert.alert(
      'Playback Error',
      'There was an error attempting to play the track.',
    );
  }
};
