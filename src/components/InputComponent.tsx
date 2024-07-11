import { View, TextInput, TextInputProps, ViewStyle, StyleProp, TextStyle } from "react-native";
import React, {memo, Ref} from 'react';
import {appColors} from '../assets/colors/appColors';
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  flex?: number;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  textColor?: string;
  style?: StyleProp<TextStyle>;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  ref?: Ref<TextInput>;
}
const InputComponent = (props: InputProps) => {
  const {
    value,
    onChangeText,
    textColor,
    style,
    flex,
    autoCapitalize,
    ref,
    ...resProps
  } = props;
  return (
    <TextInput
      ref={ref}
      {...resProps}
      style={[{color: textColor ?? appColors.white, flex: flex}, style]}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
    />
  );
};
export default memo(InputComponent);
