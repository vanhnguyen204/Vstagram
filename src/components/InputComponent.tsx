import {View, TextInput, TextInputProps, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {appColors} from '../assets/colors/appColors';
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  flex?: number;
  placeholder: string;
  placeholderTextColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  textColor: string;
  style?: ViewStyle;
}
const InputComponent = (props: InputProps) => {
  const {
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    textColor,
    style,
    flex,
    ...resProps
  } = props;
  return (
    <TextInput
      {...resProps}
      style={[{color: textColor ?? appColors.white, flex: flex}, style]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
    />
  );
};
export default memo(InputComponent);
