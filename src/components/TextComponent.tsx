import {View, Text, TextBase} from 'react-native';
import React, {memo} from 'react';
import {globalStyle} from '../styles/globalStyle';
import {appColors} from '../assets/colors/appColors';
import {FlexBoxProp} from '../constants/FlexBoxProp';

interface TextProps extends FlexBoxProp {
  value: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
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
    alignSelf,
    marginVertical,
    marginHorizontal,
    margin,
    fontWeight,
  } = props;
  return (
    <Text
      {...props}
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
          alignSelf: alignSelf ?? undefined,
          marginVertical: marginVertical ?? 0,
          marginHorizontal: marginHorizontal ?? 0,
          margin: margin ?? 0,
          fontWeight: fontWeight,
        },
      ]}>
      {value}
    </Text>
  );
};

export default memo(TextComponent);
