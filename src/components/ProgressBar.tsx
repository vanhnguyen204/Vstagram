import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

interface ProgressBarProps {
  duration: number; // Thời gian chạy của progress bar (ms)
  color: string; // Màu sắc của progress bar
  onEnd: () => void;
  start: boolean; // Bắt đầu progress bar hay không,
  completed: boolean;
  pause: boolean;
  sizeOfListProgress: number;
}
const ProgressBar = forwardRef(
  (
    {
      duration,
      color,
      onEnd,
      start,
      pause,
      sizeOfListProgress,
      completed,
    }: ProgressBarProps,
    ref,
  ) => {
    const progress = useRef(new Animated.Value(0)).current;
    const currentValue = useRef(0);
    const isPaused = useRef(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        progress.setValue(0);
        currentValue.current = 0;
        isPaused.current = false;
      },
    }));

    useEffect(() => {
      if (start && !completed) {
        const animate = (toValue: number, _duration: number) => {
          Animated.timing(progress, {
            toValue,
            duration: _duration,
            easing: Easing.linear,
            useNativeDriver: false, // Sử dụng false vì width không hỗ trợ native driver
          }).start(end => {
            if (end.finished && !isPaused.current) {
              onEnd();
            }
          });
        };

        if (pause) {
          progress.stopAnimation(value => {
            currentValue.current = value;
            isPaused.current = true;
          });
        } else {
          isPaused.current = false;
          animate(1, (1 - currentValue.current) * duration);
        }
      }
    }, [completed, duration, onEnd, progress, start, pause]);

    const widthInterpolated = progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={[styles.container, {flex: 1}]}>
        <Animated.View
          style={[
            styles.progressBar,
            {width: widthInterpolated, backgroundColor: color},
          ]}
        />
        {completed && (
          <View style={[styles.completedOverlay, {backgroundColor: color}]} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    height: 2, // Chiều cao của progress bar
    backgroundColor: 'rgba(240, 240, 240, 0.3)', // Màu nền của container
    borderRadius: 5, // Bo góc của container
    overflow: 'hidden', // Đảm bảo không bị tràn ra ngoài
  },
  progressBar: {
    height: '100%', // Chiều cao của progress bar
    backgroundColor: 'blue', // Màu nền của progress bar
  },
  completedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
  },
});

export default ProgressBar;
