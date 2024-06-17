import React, {useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {appColors} from '../assets/colors/appColors';
import {AppInfor} from '../constants/AppInfor.ts';
import ButtonComponent from './ButtonComponent.tsx';
import Box from './Box.tsx';

type Props<T> = {
  data: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  visible: boolean;
  onClose: () => void;
  containerStyle?: ViewStyle;
  buttonCloseColor?: string;
  onEndReached: (distance: number) => void;
};

const ScrollableModal = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  visible,
  onClose,
  containerStyle,
  buttonCloseColor,
  onEndReached,
}: Props<T>) => {
  const scrollViewRef = useRef<FlatList<T>>(null);
  const [scrollOffset, setScrollOffset] = useState<number | null>(null);

  const handleOnScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (offset: number, animated?: boolean): void => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset, animated});
    }
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      scrollTo={(params: {x: number; y: number; animated?: boolean}) =>
        handleScrollTo(params.y, params.animated)
      }
      scrollOffset={scrollOffset ?? 0}
      scrollOffsetMax={100}
      propagateSwipe={true}
      style={styles.modal}>
      <View style={[styles.scrollableModal, containerStyle]}>
        <SafeAreaView>
          <Box alignItems={'center'} justifyContent={'center'}>
            <View style={styles.modalIndicatorTop} />
            <ButtonComponent
              style={styles.buttonCancel}
              nameColor={buttonCloseColor}
              name={'Huỷ'}
              onPress={onClose}
              alignSelf={'flex-end'}
            />
          </Box>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={({distanceFromEnd}) => {
              onEndReached(distanceFromEnd);
            }}
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.gray,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: AppInfor.height / 2,
    backgroundColor: appColors.gray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
  modalIndicatorTop: {
    height: 5,
    width: 40,
    backgroundColor: appColors.grays.gray700,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonCancel: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default ScrollableModal;
