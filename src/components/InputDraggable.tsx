import React, {forwardRef, useState} from 'react';
import {StyleProp, TextInput, TextInputProps, TextStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface InputDraggableProps extends TextInputProps {
  textInputStyle?: StyleProp<TextStyle>;
  onPanResponderMove: (inputId: string) => void;
  onPanResponderRelease: () => void;
  id: string;
}

const InputDraggable = forwardRef(
  (props: InputDraggableProps, ref: React.LegacyRef<TextInput>) => {
    const [value, setValue] = useState<string>('');
    const {
      textInputStyle,
      id,
      onPanResponderRelease,
      onPanResponderMove,
      ...rest
    } = props;
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
        <Animated.View style={[animatedStyles]}>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={textInputStyle}
            {...rest}
            ref={ref}
          />
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default InputDraggable;
