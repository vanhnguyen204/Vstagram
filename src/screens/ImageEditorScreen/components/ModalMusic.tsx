import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {musicStore} from '../../../hooks';
import MusicItem from './MusicItem.tsx';
import {Music} from '../../../models';
import {getMusics} from '../../../services/apis/musicServices.ts';
import ModalScrollable from '../../../components/ModalScrollable.tsx';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {startTrackPlayer, stopTrack} from '../../../../service';

interface ModalMusicProps {
  visible: boolean;
  onClose: () => void;
  onMusicSelected: (music: Music) => void;
}
const ModalMusic = (props: ModalMusicProps) => {
  const {visible, onClose, onMusicSelected} = props;

  const {musicPlaying, setMusics, musics, setMusicPlaying, clearMusicPlaying} =
    musicStore();
  const playMusic = useCallback(
    async (music: Music) => {
      await startTrackPlayer(music);
      setMusicPlaying(music);
    },
    [setMusicPlaying],
  );
  const isPlaying = useCallback(
    (item: Music): boolean => {
      return item._id === musicPlaying._id;
    },
    [musicPlaying._id],
  );
  const stopMusic = useCallback(async () => {
    try {
      stopTrack()
        .then(res => {
          console.log('Stop track player: ', res);
        })
        .catch(e => {
          console.log(e);
        });
      clearMusicPlaying();
    } catch (error) {
      console.error('Error stopping music:', error);
    }
  }, [clearMusicPlaying]);

  const getMusicsAxios = useCallback(() => {
    if (musics.nextPage) {
      getMusics(10, musics.nextPage)
        .then(res => {
          setMusics(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [musics.nextPage]);
  const renderMusicItem = useCallback(
    ({item, index}: {item: Music; index: number}) => {
      return (
        <MusicItem
          isPlaying={isPlaying(item)}
          onMusicSelected={onMusicSelected}
          onPlay={() => playMusic(item)}
          onStop={stopMusic}
          index={index}
          item={item}
        />
      );
    },
    [isPlaying, onMusicSelected, playMusic, stopMusic],
  );
  useEffect(() => {}, [clearMusicPlaying]);
  const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackQueueEnded,
  ];
  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackQueueEnded) {
      clearMusicPlaying();
    }
  });

  return (
    <ModalScrollable<Music>
      data={musics.data}
      renderItem={renderMusicItem}
      keyExtractor={item => item._id.toString()}
      visible={visible}
      onClose={onClose}
      onEndReached={distance => {
        if (distance <= 0) {
          return;
        }
        getMusicsAxios();
      }}
    />
  );
};
const styles = StyleSheet.create({
  modalMusicContainer: {
    width: AppInfor.width,
    height: AppInfor.height * 0.7,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  viewHorizontalTop: {
    width: 40,
    height: 5,
    borderRadius: 20,
    overflow: 'visible',
  },
});
export default memo(ModalMusic);
