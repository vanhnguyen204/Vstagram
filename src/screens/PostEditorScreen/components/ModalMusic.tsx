import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {musicStore} from '../../../hooks';
import MusicItem from './MusicItem.tsx';
import {Music} from '../../../models';
import {getMusics} from '../../../services/apis/musicServices.ts';
import ModalScrollable from '../../../components/ModalScrollable.tsx';
import TrackPlayer from 'react-native-track-player';

interface ModalMusicProps {
  visible: boolean;
  onClose: () => void;
  onMusicSelected: (music: Music) => void;
}
const ModalMusic = (props: ModalMusicProps) => {
  const {visible, onClose, onMusicSelected} = props;

  const {musicPlaying, setMusics, musics, setMusicPlaying, clearMusicPlaying} =
    musicStore();
  const playMusic = async (music: Music) => {
    await TrackPlayer.reset();
    setMusicPlaying(music);
    await TrackPlayer.add({
      id: music._id,
      url: music.urlMedia,
      artwork: music.image,
      title: music.title,
      artist: music.artist,
    });
    await TrackPlayer.play();
  };
  const stopMusic = useCallback(async () => {
    try {
      await TrackPlayer.reset();
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
  }, [musics.nextPage, setMusics]);
  const renderMusicItem = useCallback(
    ({item, index}: {item: Music; index: number}) => {
      return (
        <MusicItem
          isPlaying={musicPlaying._id === item._id}
          onMusicSelected={onMusicSelected}
          onPlay={() => playMusic(item)}
          onStop={stopMusic}
          index={index}
          item={item}
        />
      );
    },
    [musicPlaying._id, onMusicSelected, playMusic, stopMusic],
  );
  return (
    <ModalScrollable<Music>
      data={musics.data}
      renderItem={renderMusicItem}
      keyExtractor={(item, index) => item._id.toString()}
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
