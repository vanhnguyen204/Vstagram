import React from 'react';
import Box from '../../../../components/Box.tsx';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import FastImage from 'react-native-fast-image';
import Spacer from '../../../../components/Spacer.tsx';
import TextComponent from '../../../../components/TextComponent.tsx';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import {Post} from '../../../../models/Post.ts';
import PostActions from './PostActions.tsx';
interface SingleImageProps {
  item: string;
}
const SingleImage = (props: SingleImageProps) => {
  const {item} = props;
  return (
    <Box flex={1} marginVertical={10}>
      <FastImage
        source={{uri: item}}
        style={{
          width: AppInfor.width,
          height: AppInfor.width,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <PostActions />
    </Box>
  );
};

export default SingleImage;
