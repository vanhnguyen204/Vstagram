import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {Stickers} from '../../../models/Stickers.ts';
import StickerItem from './StickerItem.tsx';
import {useStoryStore} from '../../../hooks/useStoryEditor.ts';
import {musicStore} from '../../../hooks/useMusic.ts';
import MusicItem from './MusicItem.tsx';

const ModalMusic = () => {
  const {isModalMusicShow, toggleModalMusic} = useStoryStore();
  const {listMusic} = musicStore();
  return (
    <Modal
      isVisible={isModalMusicShow}
      onSwipeComplete={() => toggleModalMusic(false)}
      swipeDirection={['down']}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      avoidKeyboard={true}
      scrollHorizontal={true}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      swipeThreshold={250}>
      <Box
        position="absolute"
        width={AppInfor.width}
        height={AppInfor.height * 0.7}
        bottom={0}
        style={[styles.modalMusicContainer]}
        // alignItems={'center'}
        backgroundColor={'rgba(0,0,0, 0.5)'}>
        <Box
          style={{width: 40, height: 5, borderRadius: 20, overflow: 'visible'}}
          marginVertical={10}
          radius={20}
          backgroundColor={appColors.gray}>
          <View />
        </Box>
        <FlatList
          style={{width: AppInfor.width}}
          data={listMusic}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => (
            <MusicItem index={index} item={item} />
          )}
        />
      </Box>
    </Modal>
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
});
export default memo(ModalMusic);
