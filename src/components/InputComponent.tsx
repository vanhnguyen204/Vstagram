import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {appColors} from '../assets/colors/appColors';
interface InputProps {
  value: string;
  onChangeText: () => void;
  label: string;
  labelColor?: string;
  borderColor?: string;
  borderWidth?: number;
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
}
const InputComponent = (props: InputProps) => {
  const {
    value,
    onChangeText,
    label,
    labelColor,
    borderColor,
    placeholder,
    placeholderTextColor,
    borderWidth,
    borderRadius,
    padding,
    margin,
    marginVertical,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
  } = props;
  return (
    <View>
      <Text style={{color: labelColor ?? appColors.white}}>{label}</Text>
      <View
        style={{
          borderRadius: borderRadius ?? 15,
          borderWidth: borderWidth ?? 1,
          padding: padding ?? 5,
          borderColor: borderColor ?? appColors.white,
          marginTop: marginTop ?? 0,
          marginVertical: marginVertical ?? 0,
          margin: margin ?? 0,
          marginHorizontal: marginHorizontal ?? 0,
          marginLeft: marginLeft ?? 0,
          marginRight: marginRight ?? 0,
          marginBottom: marginBottom ?? 0,
        }}>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default InputComponent;
