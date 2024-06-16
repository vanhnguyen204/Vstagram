import React, {memo, useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene.tsx';
import App from '../../App.tsx';
import {AppInfor} from '../constants/AppInfor.ts';
import app from '../../App.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import Box from './Box.tsx';
import TextComponent from './TextComponent.tsx';

interface ScrollableModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  data?: any;
}

const ModalScrollable = (props: ScrollableModalProps) => {
  const {children, isVisible, onClose, data} = props;
  const [scrollOffset, setScrollOffset] = useState<number | undefined>(0);
  const scrollViewRef = useRef<FlatList<number>>(null);
  const data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (offset: number, animated?: boolean) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset, animated});
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      scrollTo={(params: {x: number; y: number; animated?: boolean}) =>
        handleScrollTo(params.y, params.animated)
      }
      scrollOffset={scrollOffset}
      scrollOffsetMax={100}
      propagateSwipe={true}>
      <Box
        style={{
          position: 'absolute',
          height: AppInfor.height / 2,
          bottom: 0,
          right: 0,
          backgroundColor: appColors.blue500,
          alignSelf: 'stretch',
        }}>
        <FlatList
          data={data1}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <Box
              marginBottom={10}
              flex={1}
              padding={20}
              backgroundColor={'green'}
              alignSelf={'stretch'}>
              <TextComponent value={item.toString()} />
            </Box>
          )}
        />
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollableModal: {
    height: AppInfor.height / 2,
    width: AppInfor.width,
    backgroundColor: appColors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default memo(ModalScrollable);
