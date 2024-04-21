import {
  ImageSourcePropType,
  Image,
  ImageResizeMode,
  FlexAlignType,
} from 'react-native';
import React, {memo} from 'react';
import {appColors} from '../assets/colors/appColors';
interface ImageProps {
  src: ImageSourcePropType;
  width: number;
  height: number;
  tinColor?: string;
  resizeMode?: ImageResizeMode;
  alignSelf?: FlexAlignType;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}
const ImageComponent = (props: ImageProps) => {
  const {
    src,
    height,
    width,
    tinColor,
    resizeMode,
    alignSelf,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
  } = props;
  return (
    <Image
      source={src}
      style={{
        height: height,
        width: width,
        tintColor: tinColor ?? undefined,
        resizeMode: resizeMode ?? 'contain',
        alignSelf: alignSelf ?? 'center',
        margin: margin ?? 0,
        marginBottom: marginBottom ?? 0,
        marginHorizontal: marginHorizontal ?? 0,
        marginLeft: marginLeft ?? 0,
        marginRight: marginRight ?? 0,
        marginTop: marginTop ?? 0,
        marginVertical: marginVertical ?? 0,
      }}
    />
  );
};

export default memo(ImageComponent);
