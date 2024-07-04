import React, {memo, useCallback, useState} from 'react';
import Box from '../../../../components/Box.tsx';
import {Post, PostType} from '../../../../models/Post.ts';
import TextComponent from '../../../../components/TextComponent.tsx';
import Spacer from '../../../../components/Spacer.tsx';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import {appColors} from '../../../../assets/colors/appColors.ts';
import VideoRender from './VideoRender.tsx';
import SingleImage from './SingleImage.tsx';
import MultipleImage from './MultipleImage.tsx';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import {calculateTimeDifference} from '../../../../utils/DateTime.ts';
import useAudioControl from '../../../../hooks/TrackPlayer/useAudioControl.ts';

interface PostCardProps {
  item: Post;
  pauseVideo: boolean;
  toggleMute?: () => void;
  isMuted?: boolean;
}

const PostCard = (props: PostCardProps) => {
  const {item, pauseVideo, toggleMute, isMuted} = props;
  console.log('re-render: ', item._id);
  const renderPhotos = useCallback(() => {
    if (item.postType.type === PostType.PHOTO) {
      const hasMusic = item.music !== '';
      if (item.postType.images.length > 1) {
        return (
          <MultipleImage
            {...(item.music && {toggleMute, isMuted})}
            hasMusic={hasMusic}
            images={item.postType.images}
          />
        );
      } else {
        return (
          <SingleImage
            {...(item.music && {toggleMute, isMuted})}
            hasMusic={hasMusic}
            imageURL={item.postType.images[0]}
          />
        );
      }
    }
  }, [item, isMuted, toggleMute]);

  const renderContent = useCallback(() => {
    switch (item.postType.type) {
      case PostType.PHOTO:
        return renderPhotos();
      case PostType.VIDEO:
        return <VideoRender paused={pauseVideo} item={item} />;
      default:
        return null;
    }
  }, [item, renderPhotos, pauseVideo]);

  return (
    <Box flex={1} marginVertical={5}>
      <Spacer
        width={AppInfor.width}
        background={appColors.grays.gray800}
        height={1}
      />
      {item.postType.type === PostType.PHOTO && (
        <ButtonComponent
          name={'See more user information'}
          marginTop={5}
          alignSelf={'flex-start'}
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
      )}
      {renderContent()}
      <TextComponent value={item.description} />
      <TextComponent
        fontSize={12}
        value={calculateTimeDifference(item.timeCreated ?? '')}
      />
    </Box>
  );
};

export default memo(PostCard);
