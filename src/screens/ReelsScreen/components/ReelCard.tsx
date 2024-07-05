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
  getVideoRef: () => VideoRef | null;
  isPaused: () => boolean;
}

const ReelCard = forwardRef<ReelCardHandle, ReelCardProps>(
  ({item, index, isFocused}, ref) => {
    const likeRef = useRef<ReelControllerHandle>(null);
    const videoRef = useRef<VideoRef>(null);
    const {visible, setVisible, setComments} = useComment();
    const [loading, setLoading] = useState(false);
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
      console.log('-----------------');
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
      console.log('On Press pause');
    }, []);

    return (
      <View
        style={{
          flex: 1,
          height: AppInfor.height - bottomBarHeight,
          backgroundColor: index % 2 === 0 ? appColors.red : appColors.blue500,
        }}>
        <Video
          // onLoad={() => setLoading(false)}
          repeat={true}
          ref={videoRef}
          paused={paused}
          source={{uri: item.videoURL}}
          resizeMode="contain"
          style={{flex: 1, width: AppInfor.width, height: undefined}}
        />
        {loading && (
          <Box
            flex={1}
            position="absolute"
            top={0}
            left={0}
            alignItems="center"
            justifyContent="center"
            right={0}
            bottom={0}>
            <ActivityIndicator size="small" color={appColors.white} />
          </Box>
        )}
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
