import React, {memo, useCallback} from 'react';
import Box from '../../../../components/Box.tsx';
import {Post, PostType} from '../../../../models/Post.ts';
import TextComponent from '../../../../components/TextComponent.tsx';
import Spacer from '../../../../components/Spacer.tsx';
import {AppInfor} from '../../../../constants/AppInfor.ts';
import {appColors} from '../../../../assets/colors/appColors.ts';
import PostActions from './PostActions.tsx';
import {usePhotos} from '../../../../hooks/Media/usePhotos.ts';
import VideoRender from './VideoRender.tsx';
import SingleImage from './SingleImage.tsx';
import MultipleImage from './MultipleImage.tsx';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import {calculateTimeDifference} from '../../../../utils/DateTime.ts';

interface PostCardProps {
  item: Post;
  paused: boolean;
}

const PostCard = (props: PostCardProps) => {
  const {item, paused} = props;
  const {photos} = usePhotos();

  const renderPhotos = useCallback(() => {
    if (!item?.images) {
      return null;
    }
    if (item.images.length > 1) {
      return <MultipleImage images={item.images} />;
    }

    return <SingleImage item={item.images[0]} />;
  }, [item]);

  const renderContent = useCallback(() => {
    switch (item.type) {
      case 0:
        return renderPhotos();
      case 1:
        return <VideoRender paused={paused} item={item} />;
      default:
        return null;
    }
  }, [item, renderPhotos, paused]);

  return (
    <Box flex={1} marginVertical={5}>
      <Spacer
        width={AppInfor.width}
        background={appColors.grays.gray800}
        height={1}
      />
      {item.type === PostType.PHOTO && (
        <ButtonComponent
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
        value={calculateTimeDifference(item.timeCreate ?? '')}
      />
    </Box>
  );
};

export default memo(PostCard);
