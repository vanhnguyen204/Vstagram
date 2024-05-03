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
  width?: number;
  height?: number | undefined;
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
  flex?: number;
  style?: ViewStyle;
}
const ImageComponent = (props: ImageProps) => {
  const {
    src,
    height,
    width,
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
  } = props;
  return (
    <Image
      source={src}
      style={[
        {
          height: height ?? undefined,
          width: width ?? undefined,
          tintColor: tintColor,
          resizeMode: resizeMode,
          alignSelf: alignSelf,
          margin: margin,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          marginLeft: marginLeft,
          marginRight: marginRight,
          marginTop: marginTop,
          marginVertical: marginVertical,
          flex: flex ?? 0,
        },
        style,
      ]}
    />
  );
};

export default memo(ImageComponent);
