import React, {memo, Ref, useEffect, useRef, useState} from 'react';
import {Reel} from '../../../models/Reel.ts';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import ReelController, {ReelControllerHandle} from './ReelController.tsx';
import {useComment} from '../../../hooks/useComment.ts';
import Box from '../../../components/Box.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';

interface ReelProps {
  item: Reel;
  isFocused: boolean;
}
const ReelCard = (props: ReelProps) => {
  const {item, isFocused} = props;
  const likeRef = useRef<ReelControllerHandle>(null);
  const videoRef = useRef<VideoRef>(null);
  const {visible, setVisible, setComments} = useComment();
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState<boolean>(!isFocused);
  useEffect(() => {
    setPaused(!isFocused);
    videoRef.current && videoRef.current.seek(0);
  }, [isFocused]);
  const handleLikePress = () => {
    if (likeRef.current) {
      likeRef.current.toggleLike();
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <Video
        onLoad={data => {
          setLoading(false);
        }}
        repeat={true}
        ref={videoRef}
        paused={paused}
        source={{uri: item.videoURL}}
        resizeMode={'contain'}
        style={{flex: 1}}
      />
      {loading && (
        <Box
          flex={1}
          position={'absolute'}
          top={0}
          left={0}
          alignItems={'center'}
          justifyContent={'center'}
          right={0}
          bottom={0}>
          <ActivityIndicator size={'small'} color={appColors.white} />
        </Box>
      )}
      <ReelController
        onShare={() => {}}
        paused={paused}
        ref={likeRef}
        item={item}
        onPause={() => {
          setPaused(prevState => !prevState);
        }}
        onLikePress={() => {
          handleLikePress();
        }}
        onCommentPress={() => {
          setVisible();
          setComments(item.comment);
        }}
      />
    </SafeAreaView>
  );
};

export default memo(ReelCard);
