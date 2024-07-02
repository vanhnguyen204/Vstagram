import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import Box from '../../../../components/Box.tsx';
import PostActions from './PostActions.tsx';

interface MultipleImageProps {
  images: string[];
}
const MultipleImage = (props: MultipleImageProps) => {
  const {images} = props;
  return (
    <Box>
      <FlatList
        snapToAlignment={'center'}
        snapToInterval={AppInfor.width}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({item}) => <MultipleImageCard imageUrl={item} />}
        keyExtractor={image => image}
        horizontal
      />

      <PostActions />
    </Box>
  );
};
interface MultipleImageCardProps {
  imageUrl: string;
}
const MultipleImageCard = memo((props: MultipleImageCardProps) => {
  const {imageUrl} = props;
  return (
    <FastImage
      style={{
        width: AppInfor.width,
        height: AppInfor.width,
      }}
      resizeMode={FastImage.resizeMode.contain}
      source={{uri: imageUrl}}
    />
  );
});
export default MultipleImage;
