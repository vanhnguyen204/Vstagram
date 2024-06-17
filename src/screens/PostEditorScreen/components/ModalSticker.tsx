import React, {memo, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {FlatList, StyleSheet, View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {Stickers} from '../../../models/Stickers.ts';
import StickerItem from './StickerItem.tsx';
import {useStoryStore} from "../../../hooks";

const ModalSticker = () => {
  const {isModalStickerShow, toggleModalSticker} = useStoryStore();

  return (
    <Modal
      isVisible={isModalStickerShow}
      onSwipeComplete={() => toggleModalSticker(false)}
      swipeDirection={['down']}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      avoidKeyboard={true}
      scrollHorizontal={true}
      style={{margin: 0}}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      swipeThreshold={250}>
      <Box
        position="absolute"
        width={AppInfor.width}
        height={AppInfor.height * 0.7}
        bottom={0}
        style={[styles.modalStickerContainer]}
        alignItems={'center'}
        backgroundColor={'rgba(0,0,0, 0.5)'}>
        <Box
          style={{width: 40, height: 5, borderRadius: 20, overflow: 'visible'}}
          marginVertical={10}
          radius={20}
          backgroundColor={appColors.gray}>
          <View />
        </Box>
        <FlatList
          numColumns={3}
          data={Stickers.stickers}
          renderItem={({item, index}) => {
            return <StickerItem url={item} index={index} />;
          }}
        />
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStickerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: AppInfor.width,
    height: AppInfor.height * 0.7,
    bottom: 0,
  },
});
export default memo(ModalSticker);
