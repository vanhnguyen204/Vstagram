import {StyleSheet} from 'react-native';
import React, {memo, useCallback, useRef} from 'react';
import ImageComponent from '../../../components/ImageComponent';
import {AppInfor} from '../../../constants/AppInfor';
import {appColors} from '../../../assets/colors/appColors';
import LongPressButtonWithPopup from '../../SearchScreen/LongPressButton.tsx';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
interface StickerSelectedProps {
  item: string;
  index: number;

  opacity?: number;
  onRemove: (item: string) => void;
}

const StickerSelected = (props: StickerSelectedProps) => {
  const {item, index, onRemove, opacity = 1} = props;
  const popupRef = useRef<any>(null);

  const handleClosePopup = () => {
    if (popupRef.current) {
      popupRef.current.closeModal();
    }
  };
  const totalTranslateXSticker = useSharedValue<number>(0);
  const totalTranslateY = useSharedValue<number>(0);
  const inputTranslateX = useSharedValue<number>(0);
  const inputTranslateY = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      inputTranslateX.value = event.translationX;
      inputTranslateY.value = event.translationY;
    })
    .onEnd(() => {
      totalTranslateXSticker.value += inputTranslateX.value;
      totalTranslateY.value += inputTranslateY.value;
      inputTranslateX.value = 0;
      inputTranslateY.value = 0;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: totalTranslateXSticker.value + inputTranslateX.value},
      {translateY: totalTranslateY.value + inputTranslateY.value},
    ],
    zIndex: 99,
  }));
  const handleRemove = useCallback(() => {
    onRemove(item);
    handleClosePopup();
  }, [item, onRemove]);
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[animatedStyles, styles.renderStickerStyle, {opacity: opacity}]}>
        <LongPressButtonWithPopup
          ref={popupRef}
          buttonContent={
            <ImageComponent
              key={index}
              src={{uri: item}}
              width={100}
              height={100}
            />
          }
          popupStyle={{backgroundColor: appColors.grays.gray600}}
          popupContent={
            <ButtonComponent
              onPress={handleRemove}
              flexDirection={'row'}
              alignItems={'center'}>
              <ImageComponent
                tintColor={appColors.white}
                src={require('../../../assets/icons/trash-bin.png')}
                width={30}
                height={30}
              />
            </ButtonComponent>
          }
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  renderStickerStyle: {
    position: 'absolute',
    top: AppInfor.height / 3,
  },
});
export default memo(StickerSelected);
