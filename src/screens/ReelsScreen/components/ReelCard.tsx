import React, { memo, Ref, useEffect, useRef, useState } from "react";
import {Reel} from '../../../models/Reel.ts';
import {SafeAreaView, View} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';
import Video, {VideoRef} from 'react-native-video';
import Box from '../../../components/Box.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ReelController, {ReelControllerHandle} from './ReelController.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import {useComment} from '../../../hooks/useComment.ts';
interface ReelProps {
  item: Reel;
  isFocused: boolean;
  videoRef: Ref<VideoRef>
}
const ReelCard = (props: ReelProps) => {
  const {item, isFocused, videoRef} = props;
  const likeRef = useRef<ReelControllerHandle>(null);

  const {visible,setVisible, setComments} = useComment();
  const [paused, setPaused] = useState<boolean>(!isFocused);
  useEffect(() => {
    setPaused(!isFocused);

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
