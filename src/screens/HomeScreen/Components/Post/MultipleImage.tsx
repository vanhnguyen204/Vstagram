import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import Box from '../../../../components/Box.tsx';
import PostActions from './PostActions.tsx';
import useAudioControl from '../../../../hooks/TrackPlayer/useAudioControl.ts';
import {MuteButton} from '../../../../components/MuteButton.tsx';

interface MultipleImageProps {
  images: string[];

  isMuted?: boolean;
  toggleMute?: () => void;
  hasMusic: boolean;
}
const MultipleImage = (props: MultipleImageProps) => {
  const {images, hasMusic, isMuted, toggleMute} = props;
  console.log('re-render multiple image: ', hasMusic);
  console.log('---------------------------------');
  return (
    <Box>
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
        {hasMusic && (
          <Box position={'absolute'} bottom={10} right={10} zIndex={99}>
            <MuteButton isMuted={isMuted} toggleMute={toggleMute} />
          </Box>
        )}
      </Box>
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
        marginVertical: 10,
      }}
      resizeMode={FastImage.resizeMode.contain}
      source={{uri: imageUrl}}
    />
  );
});
export default memo(MultipleImage);
