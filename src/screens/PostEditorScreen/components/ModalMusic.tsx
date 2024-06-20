import React, {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';

import {useStoryEditor} from '../../../hooks/useStoryEditor.ts';
import {musicStore} from '../../../hooks/musicStore.ts';
import MusicItem from './MusicItem.tsx';
import {Music} from '../../../models/Music.ts';
import {getMusics} from '../../../services/apis/musicServices.ts';
import ModalScrollable from '../../../components/ModalScrollable.tsx';

const ModalMusic = () => {
  const {isModalMusicShow, toggleModalMusic} = useStoryEditor();
  const {musics, setMusics} = musicStore();

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
  return (
    <ModalScrollable<Music>
      data={musics.data}
      renderItem={({item, index}) => (
        <MusicItem
          toggleModalMusic={toggleModalMusic}
          index={index}
          item={item}
        />
      )}
      keyExtractor={(item, index) => item._id.toString()}
      visible={isModalMusicShow}
      onClose={() => toggleModalMusic(false)}
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
