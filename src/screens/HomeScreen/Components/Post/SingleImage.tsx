import React, {memo} from 'react';
import Box from '../../../../components/Box.tsx';
import FastImage from 'react-native-fast-image';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import PostActions from './PostActions.tsx';
import {StyleSheet} from 'react-native';
import useAudioControl from '../../../../hooks/TrackPlayer/useAudioControl.ts';
import {MuteButton} from '../../../../components/MuteButton.tsx';

interface SingleImageProps {
  imageURL: string;
  hasMusic: boolean;
  isMuted?: boolean;
  toggleMute?: () => void;
}
const SingleImage = (props: SingleImageProps) => {
  const {imageURL, hasMusic, isMuted, toggleMute} = props;

  const styles = StyleSheet.create({
    imageStyle: {
      width: AppInfor.width,
      height: AppInfor.width,
    },
  });

  console.log('re-render single image: ', hasMusic);
  console.log('---------------------------------');

  return (
    <Box flex={1} marginVertical={10}>
      <Box>
        <FastImage
          source={{uri: imageURL}}
          style={styles.imageStyle}
          resizeMode={FastImage.resizeMode.cover}
        />
        {hasMusic &&  <MuteButton isMuted={isMuted} toggleMute={toggleMute} />}
      </Box>
      <PostActions />
    </Box>
  );
};
export default memo(SingleImage);
