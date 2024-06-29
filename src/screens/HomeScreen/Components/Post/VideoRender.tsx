import React, {memo, useState} from 'react';
import {Post} from '../../../../models/Post.ts';
import Box from '../../../../components/Box.tsx';
import {appColors} from '../../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import FastImage from 'react-native-fast-image';
import Spacer from '../../../../components/Spacer.tsx';
import TextComponent from '../../../../components/TextComponent.tsx';
import Video from 'react-native-video';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import ImageComponent from '../../../../components/ImageComponent.tsx';
import {View} from 'react-native';
import PostActions from './PostActions.tsx';

interface VideoRenderProps {
  item: Post;
  paused: boolean;
}

const VideoRender = (props: VideoRenderProps) => {
  const {item, paused} = props;
  const [muted, setMuted] = useState(false);

  return (
    <Box>
      <Box>
        <Box position={'absolute'} top={0} zIndex={1}>
          <ButtonComponent
            marginTop={10}
            flexDirection={'row'}
            onPress={() => {}}>
            <FastImage
              source={{uri: item.avatar}}
              style={{height: 30, width: 30, borderRadius: 99}}
              resizeMode={'cover'}
            />
            <Spacer width={5} />
            <TextComponent value={item.name} />
          </ButtonComponent>
        </Box>
        <Video
          paused={paused}
          muted={muted}
          repeat={true}
          source={{uri: item.videoURL}}
          style={{width: AppInfor.width, height: AppInfor.width}}
          resizeMode="cover"
        />
        <Box position={'absolute'} bottom={10} right={10} zIndex={1999}>
          <ButtonComponent
            backgroundColor={appColors.darkBlur}
            radius={99}
            alignItems={'center'}
            padding={3}
            justifyContent={'center'}
            onPress={() => {
              setMuted(prevState => !prevState);
            }}>
            <ImageComponent
              alignSelf={'center'}
              tintColor={appColors.white}
              src={
                muted
                  ? require('../../../../assets/icons/mute.png')
                  : require('../../../../assets/icons/volume.png')
              }
            />
          </ButtonComponent>
        </Box>
      </Box>
      <PostActions />
    </Box>
  );
};

export default memo(VideoRender);
