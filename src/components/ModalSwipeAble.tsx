import React from 'react';
import {
  Modal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {appColors} from '../assets/colors/appColors.ts';
interface ModalSwipeAbleProps {
  visible: boolean;
  onClose: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  swipeThreshold?: number;
}
const ModalSwipeAble = (props: ModalSwipeAbleProps) => {
  const {
    visible,
    swipeThreshold = 200,
    children,
    containerStyle,
    onClose,
  } = props;
  const translateY = useSharedValue(0);
  const goDefaultPosition = () => {
    setTimeout(() => {
      translateY.value = 0;
    }, 500);
  };
  const gesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY >= 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (event.translationY > swipeThreshold) {
        translateY.value = withSpring(1000);
        runOnJS(onClose)();
        runOnJS(goDefaultPosition)();
      } else {
        translateY.value = withSpring(0, {damping: 100});
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      flex: 1,
    };
  });
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <GestureDetector gesture={gesture}>
        <SafeAreaView style={[styles.containerModal, containerStyle]}>
          <Animated.View style={[animatedStyle]}>{children}</Animated.View>
        </SafeAreaView>
      </GestureDetector>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
  },
});
export default ModalSwipeAble;
