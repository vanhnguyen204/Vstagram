import {
  ImageSourcePropType,
  Image,
  ImageResizeMode,
  FlexAlignType,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {appColors} from '../assets/colors/appColors';
import {globalStyle} from '../styles/globalStyle';
interface ImageProps {
  src: ImageSourcePropType;
  width?: number | string | undefined;
  height?: number | string | undefined;
  tintColor?: string;
  resizeMode?: ImageResizeMode;
  alignSelf?: FlexAlignType;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number;
  flex?: number;
  aspectRatio?: number | string | undefined;
  style?: ViewStyle;
}
const ImageComponent = (props: ImageProps) => {
  const {
    src,
    height = 24,
    width = 24,
    tintColor = undefined,
    resizeMode = 'contain',
    alignSelf = 'flex-start',
    margin = 0,
    marginBottom = 0,
    marginHorizontal = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
    marginVertical = 0,
    flex,
    style,
    borderRadius = 0,
    aspectRatio,
  } = props;
  return (
    // @ts-ignore
    <Image
      source={src}
      style={[
        {
          height: height ?? undefined,
          width: width ?? undefined,
          tintColor: tintColor,
          resizeMode: resizeMode,
          alignSelf: alignSelf,
          margin: margin ?? undefined,
          marginBottom: marginBottom ?? undefined,
          marginHorizontal: marginHorizontal ?? undefined,
          marginLeft: marginLeft ?? undefined,
          marginRight: marginRight ?? undefined,
          marginTop: marginTop ?? undefined,
          marginVertical: marginVertical ?? undefined,
          flex: flex ?? 0,
          borderRadius,
          aspectRatio: aspectRatio,
        },
        style,
      ]}
    />
  );
};

export default memo(ImageComponent);
