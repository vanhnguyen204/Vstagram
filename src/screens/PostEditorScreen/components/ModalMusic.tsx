import React, {memo, useState} from 'react';
import Modal from 'react-native-modal';
import {FlatList, StyleSheet, View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';

import {useStoryStore} from '../../../hooks/useStoryEditor.ts';
import {musicStore} from '../../../hooks/useMusic.ts';
import MusicItem from './MusicItem.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';

const ModalMusic = () => {
  const {isModalMusicShow, toggleModalMusic} = useStoryStore();
  const [scrollOffset, setScrollOffset] = useState<number | null>(null);

  const {listMusic} = musicStore();
  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  return (
    <Modal
      isVisible={isModalMusicShow}
      onSwipeComplete={() => toggleModalMusic(false)}
      swipeDirection={['down']}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      avoidKeyboard={true}
      scrollHorizontal={true}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
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
          style={styles.viewHorizontalTop}
          marginVertical={10}
          radius={20}
          backgroundColor={appColors.gray}>
          <View />
        </Box>
        <ButtonComponent
          nameColor={appColors.blue500}
          style={{position: 'absolute', top: 0, right: 10}}
          name="Huỷ"
          onPress={() => {
            toggleModalMusic(false);
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={true}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
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
  viewHorizontalTop: {
    width: 40,
    height: 5,
    borderRadius: 20,
    overflow: 'visible',
  },
});
export default memo(ModalMusic);