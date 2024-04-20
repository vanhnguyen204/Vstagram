import {ImageSourcePropType, Image, ImageResizeMode} from 'react-native';
import React from 'react';
import {appColors} from '../assets/colors/appColors';
interface ImageProps {
  src: ImageSourcePropType;
  width: number;
  height: number;
  tinColor?: string;
  resizeMode?: ImageResizeMode;
}
const ImageComponent = (props: ImageProps) => {
  const {src, height, width, tinColor, resizeMode} = props;
  return (
    <Image
      source={src}
      style={{
        height: height,
        width: width,
        tintColor: tinColor ?? appColors.white,
        resizeMode: resizeMode ?? 'contain',
      }}
    />
  );
};

export default ImageComponent;
