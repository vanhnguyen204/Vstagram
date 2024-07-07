import React, {memo, useCallback, useState} from 'react';
import {Post, PostType, PostVideo} from '../../../../models/Post.ts';
import Box from '../../../../components/Box.tsx';
import {appColors} from '../../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import FastImage from 'react-native-fast-image';
import Spacer from '../../../../components/Spacer.tsx';
import TextComponent from '../../../../components/TextComponent.tsx';
import Video from 'react-native-video';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import ImageComponent from '../../../../components/ImageComponent.tsx';
import PostActions from './PostActions.tsx';
import {MuteButton} from '../../../../components/MuteButton.tsx';

interface VideoRenderProps {
  item: Post;
  paused: boolean;
}

const VideoRender = (props: VideoRenderProps) => {
  const {item, paused} = props;
  const [muted, setMuted] = useState(false);
  const postType = item.postType as PostVideo;
  // console.log('Re-render Video');
  const toggleMute = useCallback(() => {
    setMuted(prevState => !prevState);
  }, []);
  return (
    <Box>
      <Box>
        <Box
          position={'absolute'}
          top={0}
          bottom={0}
          right={0}
          padding={10}
          justifyContent={'space-between'}
          left={0}
          zIndex={1}>
          <ButtonComponent flexDirection={'row'} onPress={() => {}}>
            <FastImage
              source={{uri: item.avatar}}
              style={{height: 30, width: 30, borderRadius: 99}}
              resizeMode={'cover'}
            />
            <Spacer width={5} />
            <TextComponent value={item.name} />
          </ButtonComponent>
          <Box flexDirection={'row'} alignSelf={'flex-end'}>
            <MuteButton isMuted={muted} toggleMute={toggleMute} />
          </Box>
        </Box>
        <Video
          paused={paused}
          muted={muted}
          repeat={true}
          source={{
            uri: postType.videoURL,
          }}
          style={{width: AppInfor.width, height: AppInfor.width}}
          resizeMode="cover"
        />
        {/*<Box position={'absolute'} bottom={10} right={10} zIndex={1999}>*/}
        {/*  <ButtonComponent*/}
        {/*    backgroundColor={appColors.darkBlur}*/}
        {/*    radius={99}*/}
        {/*    alignItems={'center'}*/}
        {/*    padding={3}*/}
        {/*    justifyContent={'center'}*/}
        {/*    onPress={() => {*/}
        {/*      setMuted(prevState => !prevState);*/}
        {/*    }}>*/}
        {/*    <ImageComponent*/}
        {/*      alignSelf={'center'}*/}
        {/*      tintColor={appColors.white}*/}
        {/*      src={*/}
        {/*        muted*/}
        {/*          ? require('../../../../assets/icons/mute.png')*/}
        {/*          : require('../../../../assets/icons/volume.png')*/}
        {/*      }*/}
        {/*    />*/}
        {/*  </ButtonComponent>*/}
        {/*</Box>*/}
      </Box>
      <PostActions />
    </Box>
  );
};

export default memo(VideoRender);
