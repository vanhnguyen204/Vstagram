import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {FlexBoxProp} from '../constants/FlexBoxProp';
import {globalStyle} from '../styles/globalStyle';
import TextComponent from './TextComponent';

interface ButtonProps extends FlexBoxProp {
  name: string;
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  nameColor?: string;
  children?: ReactNode | undefined;
}
const ButtonComponent = (props: ButtonProps) => {
  const {
    name,
    onPress,
    style,
    backgroundColor,
    nameColor,
    radius,
    padding,
    alignItems,
    alignSelf,
    children,
    marginHorizontal,
    flexDirection,
    justifyContent,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: backgroundColor,
          borderRadius: radius ?? 20,
          padding: padding ?? 10,
          alignItems: alignItems ?? 'center',
          alignSelf: alignSelf ?? 'stretch',
          marginHorizontal: marginHorizontal ?? 0,
          flexDirection: flexDirection ?? 'column',
          justifyContent: justifyContent ?? 'center',
        },
      ]}>
      {children ? children : <TextComponent color={nameColor} value={name} />}
    </TouchableOpacity>
  );
};

export default memo(ButtonComponent);
