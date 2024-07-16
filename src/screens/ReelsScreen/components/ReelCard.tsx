import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {Reel} from '../../../models/Reel.ts';
import ReelController, {ReelControllerHandle} from './ReelController.tsx';
import {useComment} from '../../../hooks/useComment.ts';
import Box from '../../../components/Box.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

interface ReelCardProps {
  item: Reel;
  isFocused: boolean;
  index: number;
}

export interface ReelCardHandle {
  pauseVideo: () => void;
  isPaused: () => boolean;
}

const ReelCard = forwardRef<ReelCardHandle, ReelCardProps>(
  ({item, index, isFocused}, ref) => {
    const likeRef = useRef<ReelControllerHandle>(null);
    const videoRef = useRef<VideoRef>(null);
    const reelControllerRef = useRef<ReelControllerHandle>();
    const {visible, setVisible, setComments} = useComment();
    const [naturalSizeVideo, setNaturalSize] = useState<{
      width: number;
      height: number;
    }>({
      width: 0,
      height: 0,
    });
    const [paused, setPaused] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      pauseVideo() {
        setPaused(true);
      },
      getVideoRef() {
        return videoRef.current;
      },
      isPaused() {
        return paused;
      },
    }));
    useEffect(() => {
      console.log('ReelCard re-render:', {index, paused});
      console.log('--------');
    }, [index, paused]);

    useEffect(() => {
      if (isFocused) {
        setPaused(false);
      } else {
        setPaused(true);
      }
    }, [isFocused]);

    const handleLikePress = () => {
      likeRef.current?.toggleLike();
    };

    const bottomBarHeight = useBottomTabBarHeight();
    const handlePause = useCallback(() => {
      setPaused(prevState => !prevState);
    }, []);

    return (
      <View
        style={{
          flex: 1,
          height: AppInfor.height - bottomBarHeight,
        }}>
        <Video
          onLoad={({naturalSize}) => {
            setNaturalSize({
              width: naturalSize.width,
              height: naturalSize.height,
            });
          }}
          repeat={true}
          ref={videoRef}
          paused={paused}
          source={{uri: item.videoURL}}
          resizeMode={naturalSizeVideo.height > 700 ? 'cover' : 'contain'}
          style={{flex: 1, width: AppInfor.width, height: undefined}}
        />
        <ReelController
          index={index}
          onShare={() => {}}
          paused={paused}
          ref={likeRef}
          item={item}
          onPause={handlePause}
          onLikePress={handleLikePress}
          onCommentPress={() => {
            setVisible();
            setComments(item.comment);
          }}
        />
      </View>
    );
  },
);
export default memo(ReelCard, (prevProps, nextProps) => {
  // console.log('PrevProps: ', prevProps);
  // console.log('NextProps: ', nextProps);
  // return true if nextProps should render as prevProps
  // return false if nextProps should not render as prevProps
  return prevProps.item._id === nextProps.item._id;
});
