import {View, Text} from 'react-native';
import React from 'react';
import {globalStyle} from '../styles/globalStyle';
import {appColors} from '../assets/colors/appColors';

interface TextProps {
  value: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}
const TextComponent = (props: TextProps) => {
  const {
    value,
    color,
    fontFamily,
    fontSize,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  } = props;
  return (
    <Text
      style={[
        globalStyle.textStyle,
        {
          color: color ?? appColors.white,
          fontFamily: fontFamily,
          fontSize: fontSize ?? 14,
          marginTop: marginTop ?? null,
          marginBottom: marginBottom ?? null,
          marginLeft: marginLeft ?? null,
          marginRight: marginRight ?? null,
        },
      ]}>
      {value}
    </Text>
  );
};

export default TextComponent;
