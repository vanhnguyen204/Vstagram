import React, {memo, useEffect, useRef, useState} from 'react';
import {Reel} from '../../../models/Reel.ts';
import {SafeAreaView, View} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';
import Video, {VideoRef} from 'react-native-video';
import Box from '../../../components/Box.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ReelController, {ReelControllerHandle} from './ReelController.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
interface ReelProps {
  item: Reel;
  isFocused: boolean;
}
const ReelCard = (props: ReelProps) => {
  const {item, isFocused} = props;
  const likeRef = useRef<ReelControllerHandle>(null);
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState<boolean>(!isFocused);
  useEffect(() => {
    setPaused(!isFocused);
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
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
        repeat={true}
        ref={videoRef}
        paused={paused}
        source={{uri: item.videoURL}}
        resizeMode={'contain'}
        style={{flex: 1}}
      />
      <ReelController
        paused={paused}
        ref={likeRef}
        item={item}
        onPause={() => {
          setPaused(prevState => !prevState);
        }}
        onLikePress={() => {
          handleLikePress();
        }}
        onCommentPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default memo(ReelCard);
