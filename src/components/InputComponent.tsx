import {View, TextInput, TextInputProps, ViewStyle} from 'react-native';
import React, {memo, Ref} from 'react';
import {appColors} from '../assets/colors/appColors';
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  flex?: number;
  placeholder?: string;
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
  textColor?: string;
  style?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  ref?: Ref<TextInput>;
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
    autoCapitalize,
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
      autoCapitalize={autoCapitalize}
    />
  );
};
export default memo(InputComponent);
