import {View, Text} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
interface ViewDraggableProps {
  children: React.ReactNode;
}
const ViewDraggable = (props: ViewDraggableProps) => {
  const {children} = props;
  const totalTranslateX = useSharedValue<number>(0);
  const totalTranslateY = useSharedValue<number>(0);
  const inputTranslateX = useSharedValue<number>(0);
  const inputTranslateY = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      inputTranslateX.value = event.translationX;
      inputTranslateY.value = event.translationY;
    })
    .onEnd(() => {
      totalTranslateX.value += inputTranslateX.value;
      totalTranslateY.value += inputTranslateY.value;
      inputTranslateX.value = 0;
      inputTranslateY.value = 0;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: totalTranslateX.value + inputTranslateX.value},
      {translateY: totalTranslateY.value + inputTranslateY.value},
    ],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[animatedStyles]}>{children}</Animated.View>
    </GestureDetector>
  );
};

export default ViewDraggable;
