import React, {memo, useRef} from 'react';
import {Animated, PanResponder, View} from 'react-native';
import {appColors} from '../assets/colors/appColors.ts';
import Slider from '@react-native-community/slider';
interface SliderProps {
  value?: number;
  onValueChange?: (fontSize: number) => void;
}
const SliderComponent = (props: SliderProps) => {
  const {value, onValueChange} = props;
  return (
    <Slider
      value={value}
      onValueChange={onValueChange}
      style={{width: 200, height: 10, transform: [{rotate: '90deg'}]}}
      minimumValue={14}
      maximumValue={50}
      vertical={true}
      inverted={true}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor={appColors.gray}
    />
  );
};

export default memo(SliderComponent);
