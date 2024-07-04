import {useEffect} from 'react';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {create} from 'zustand';

interface AudioType {
  isMuted: boolean;
}
interface AudioActions extends AudioType {
  toggleMute: () => void;
}

export const useAudioStore = create<AudioActions>(setState => ({
  isMuted: false,
  toggleMute: () => setState(state => ({isMuted: !state.isMuted})),
}));
const useAudioControl = () => {
  const events = [Event.PlaybackState];
  const {isMuted, toggleMute} = useAudioStore();
  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackState && isMuted) {
      await TrackPlayer.setVolume(0);
    } else if (event.type === Event.PlaybackState && !isMuted) {
      await TrackPlayer.setVolume(1);
    }
  });

  useEffect(() => {
    if (isMuted) {
      TrackPlayer.setVolume(0);
    } else {
      TrackPlayer.setVolume(1);
    }
  }, [isMuted]);

  return {toggleMute, isMuted};
};

export default useAudioControl;
