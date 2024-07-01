import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {AppInfor} from '../constants/AppInfor.ts';

interface DraggableProps {
  children: React.ReactNode;
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  style?: StyleProp<ViewStyle>;
  snapTo?: 'horizontal' | 'vertical';
  spring?: boolean;
  longPressDuration?: number;
}
const Draggable = ({
  children,
  minX = 0,
  maxX = AppInfor.width,
  maxY = AppInfor.height,
  minY = 0,
  snapTo,
  spring = true,
  style,
  longPressDuration = 1000,
}: DraggableProps) => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const isSnapToHorizontal = snapTo === 'horizontal';
  const isSnapToVertical = snapTo === 'vertical';
  const animateTo = spring ? withSpring : withTiming;
  const [enableDrag, setEnableDrag] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null); // Timer reference for long press

  const gesture = Gesture.Pan()
    .onStart(() => {
      startX.value = posX.value;
      startY.value = posY.value;
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    })
    .onUpdate(event => {
      posX.value = startX.value + event.translationX;
      posY.value = startY.value + event.translationY;
    })
    .onEnd(event => {
      const nextX = startX.value + event.translationX;
      const nextY = startY.value + event.translationY;

      if (nextX < minX) {
        posX.value = animateTo(minX);
        startX.value = minX;
      } else if (nextX > maxX) {
        posX.value = animateTo(maxX);
        startX.value = maxX;
      } else {
        if (isSnapToHorizontal) {
          posX.value = animateTo(nextX > (maxX - minX) / 2 ? maxX : minX);
          startX.value = nextX > (maxX - minX) / 2 ? maxX : minX;
        } else {
          posX.value = nextX;
          startX.value = nextX;
        }
      }

      if (nextY < minY) {
        posY.value = animateTo(minY);
        startY.value = minY;
      } else if (nextY > maxY) {
        posY.value = animateTo(maxY);
        startY.value = maxY;
      } else {
        if (isSnapToVertical) {
          posY.value = animateTo(nextY > (maxY - minY) / 2 ? maxY : minY);
          startY.value = nextY > (maxY - minY) / 2 ? maxY : minY;
        } else {
          posY.value = nextY;
          startY.value = nextY;
        }
      }
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    });

  const positionStyle = useAnimatedStyle(() => ({
    transform: [{translateX: posX.value}, {translateY: posY.value}],
  }));
  const startLongPressTimer = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setEnableDrag(true);
    }, longPressDuration);
  }, [longPressDuration]);

  const cancelLongPressTimer = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      setEnableDrag(false)
    }
  }, []);
  return (
    <GestureDetector gesture={gesture}>
      <Pressable
        onLongPress={startLongPressTimer}
        onPressOut={cancelLongPressTimer}>
        <Animated.View
          onResponderEnd={() => {
            setEnableDrag(false);
          }}
          style={[enableDrag && positionStyle, style]}>
          {children}
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

export default memo(Draggable);
