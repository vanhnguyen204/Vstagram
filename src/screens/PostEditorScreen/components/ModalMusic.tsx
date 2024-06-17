import React, {memo, useCallback, useState} from 'react';
import Modal from 'react-native-modal';
import {FlatList, StyleSheet, View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';

import {useStoryStore} from '../../../hooks/useStoryEditor.ts';
import {musicStore} from '../../../hooks/musicStore.ts';
import MusicItem from './MusicItem.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ScrollableModal from '../../../components/ScrollableModal.tsx';
import {Music} from '../../../models/Music.ts';
import {getMusics} from '../../../services/apis/musicServices.ts';

const ModalMusic = () => {
  const {isModalMusicShow, toggleModalMusic} = useStoryStore();
  const {musics, setMusics} = musicStore();

  const getMusicsAxios = useCallback(() => {
    if (musics.nextPage) {
      getMusics(7, musics.nextPage)
        .then(res => {
          setMusics(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [musics.nextPage, setMusics]);
  return (
    <ScrollableModal<Music>
      data={musics.data}
      renderItem={({item, index}) => <MusicItem index={index} item={item} />}
      keyExtractor={(item, index) => index.toString()}
      visible={isModalMusicShow}
      onClose={() => toggleModalMusic(false)}
      onEndReached={distance => {
        console.log(distance);
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
