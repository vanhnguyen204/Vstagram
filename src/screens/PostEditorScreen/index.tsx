import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';
// @ts-ignore
import Video, {VideoRef} from 'react-native-video';
import TextComponent from '../../components/TextComponent.tsx';
import ModalSticker from './components/ModalSticker.tsx';
import {useStoryStore} from '../../hooks/useStoryEditor.ts';
import StickerSelected from './components/StickerSelected.tsx';
import AnimatedReanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ViewShot, {ViewShotProperties} from 'react-native-view-shot';
import {PageName} from '../../config/PageName.ts';
import ModalMusic from './components/ModalMusic.tsx';
import {musicStore} from '../../hooks/useMusic.ts';
import TrackPlayer from 'react-native-track-player';
const PostEditorScreen = () => {
  const {setMusicPlaying, setUrlMusicPlaying} = musicStore();
  const {stickers, clearStickerStory, toggleModalSticker, toggleModalMusic} =
    useStoryStore();
  const [topEdgePosition, setTopEdgePosition] = useState(0);
  const [bottomEdgePosition, setBottomEdgePosition] = useState(0);
  const binOffset = useSharedValue<number>(200);
  const videoRef = useRef<VideoRef>(null);
  const viewShotRef = useRef();
  const pan = useRef(new Animated.ValueXY()).current;

  const [videoDuration, setVideoDuration] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        console.log('get dx', gestureState.dx);
        // Manually update the position

        Animated.event([null, {dx: pan.x}]);
        const timeSeek = Math.floor(gestureState.dx);
        if (!isNaN(timeSeek) && timeSeek >= 0 && timeSeek <= videoDuration) {
          videoRef.current.seek(timeSeek);
        }
      },
      onPanResponderRelease: () => {
        // pan.x.setValue(0); // Reset the pan.x to 0 on release
      },
    }),
  ).current;

  const navigation = useNavigation<NavigationProp<any>>();
  const [mediaSelected, setMediaSelected] = useState<any>();
  const chooseMedia = useCallback(async () => {
    launchImageLibrary({
      mediaType: 'mixed',
      maxHeight: AppInfor.height / 2,
    })
      .then(res => {
        if (res.didCancel) {
          goBackNavigation();
          clearStickerStory();
        } else {
          res.assets && setMediaSelected(res.assets[0]);
        }
      })
      .catch(e => {
        console.log('error library', e);
      });
  }, [clearStickerStory]);
  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      chooseMedia();
    });
  }, [chooseMedia, navigation]);
  const subType = useMemo(() => {
    let index = mediaSelected?.type.indexOf('/');
    let type = mediaSelected?.type.substring(0, index);
    return type;
  }, [mediaSelected?.type]);
  const binAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: binOffset.value}],
  }));
  const showBinRemoveSticker = useCallback(() => {
    binOffset.value = withTiming(-100, {duration: 200});
  }, [binOffset]);
  const hideBinRemoveSticker = useCallback(() => {
    binOffset.value = withTiming(100, {duration: 200});
  }, [binOffset]);
  useEffect(() => {
    const onPlaybackStateChange = async data => {
      console.log('Playback state changed', data);
      if (data.state === 'ended') {
        setMusicPlaying('');
      }
    };
    TrackPlayer.addEventListener('playback-state', onPlaybackStateChange);
  }, [setMusicPlaying]);

  const getImageEdges = useCallback(() => {
    if (mediaSelected) {
      Image.getSize(mediaSelected?.uri, (width, height) => {
        const top = AppInfor.height / 2 - height / 2;
        const bottom = AppInfor.height / 2 + height / 2;
        setTopEdgePosition(top);
        setBottomEdgePosition(bottom);
        console.log('Image position');
        console.log('Top: ', top);
        console.log('Bottom: ', bottom);
      });
    }
  }, [mediaSelected]);
  useEffect(() => {
    getImageEdges();
  }, [getImageEdges, mediaSelected]);

  const onCapture = useCallback(() => {
    viewShotRef.current &&
      viewShotRef.current.capture().then(uri => {
        console.log('Image saved to', uri);
        navigatePush(PageName.CompleteStoryScreen, {
          uriCapture: uri,
          uriOriginal: mediaSelected.uri,
        });
        // Thực hiện các thao tác khác như lưu ảnh vào thư viện ảnh của thiết bị
      });
  }, [mediaSelected?.uri]);
  const onCloseStoryEditor = useCallback(() => {
    goBackNavigation();
    clearStickerStory();
    setMusicPlaying('');
    setUrlMusicPlaying('');
    TrackPlayer.reset();
    TrackPlayer.pause();
  }, [clearStickerStory, setMusicPlaying, setUrlMusicPlaying]);
  return (
    <Container justifyContent={'flex-start'}>
      <ImageBackground
        style={[styles.imageBackgroundContainer]}
        blurRadius={20}
        source={{uri: mediaSelected?.uri}}
        resizeMode={'cover'}>
        <ModalSticker />
        <ModalMusic />
        {subType === 'video' ? (
          <Box>
            <Video
              onLoad={meta => {
                setVideoDuration(meta.duration);
              }}
              controls
              ref={videoRef}
              resizeMode="contain"
              style={styles.videoStyle}
              source={{uri: mediaSelected.uri}}
              repeat
            />
            <Animated.View
              style={{
                transform: [{translateX: pan.x}],
              }}
              {...panResponder.panHandlers}>
              <View style={styles.box} />
            </Animated.View>
          </Box>
        ) : (
          <ViewShot ref={viewShotRef} style={[styles.containerImageAndSticker]}>
            <ImageComponent
              resizeMode={'contain'}
              width={AppInfor.width}
              height={undefined}
              flex={1}
              src={{uri: mediaSelected?.uri}}
            />

            {stickers.map((item, index) => {
              return (
                <StickerSelected
                  topEdgePosition={topEdgePosition}
                  bottomEdgePosition={bottomEdgePosition}
                  key={index}
                  showTrash={showBinRemoveSticker}
                  index={index}
                  item={item}
                  hideTrash={hideBinRemoveSticker}
                />
              );
            })}
          </ViewShot>
        )}
        <Box
          position="absolute"
          top={10}
          right={0}
          left={0}
          padding={2}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <ButtonComponent
            backgroundColor={appColors.black900}
            padding={3}
            alignSelf={'center'}
            marginHorizontal={5}
            name={'Close'}
            onPress={() => {
              onCloseStoryEditor();
            }}>
            <ImageComponent
              resizeMode={'contain'}
              tintColor={appColors.white}
              src={require('../../assets/icons/close.png')}
              width={30}
              height={30}
            />
          </ButtonComponent>

          <Box flexDirection={'row'}>
            <ButtonComponent
              backgroundColor={appColors.black900}
              padding={6}
              alignSelf={'center'}
              name={'Select sticker'}
              onPress={() => {}}>
              <TextComponent value={'Aa'} fontSize={20} />
            </ButtonComponent>
            <ButtonComponent
              backgroundColor={appColors.black900}
              padding={6}
              alignSelf={'center'}
              marginHorizontal={10}
              name={'Select sticker'}
              onPress={() => {
                toggleModalSticker(true);
              }}>
              <ImageComponent
                tintColor={appColors.white}
                src={require('../../assets/icons/sticker.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
            <ButtonComponent
              backgroundColor={appColors.black900}
              padding={6}
              alignSelf={'center'}
              name={'Close'}
              onPress={() => {
                toggleModalMusic(true);
              }}>
              <ImageComponent
                tintColor={appColors.white}
                src={require('../../assets/icons/musical-note.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
            <ButtonComponent
              backgroundColor={appColors.black900}
              padding={6}
              marginHorizontal={10}
              alignSelf={'center'}
              name={'Close'}
              onPress={() => {
                onCapture();
              }}>
              <TextComponent value="Tiếp" />
            </ButtonComponent>
          </Box>
        </Box>
        <AnimatedReanimated.View
          style={[
            binAnimatedStyles,
            {alignSelf: 'center', position: 'absolute', bottom: 0},
          ]}>
          <ImageComponent
            width={30}
            tintColor={appColors.white}
            height={30}
            src={require('../../assets/icons/trash-bin.png')}
          />
        </AnimatedReanimated.View>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    height: 500,
    width: AppInfor.width,
  },
  box: {
    width: 5,
    height: 40,
    borderRadius: 20,
    backgroundColor: appColors.white,
  },
  renderStickerStyle: {
    position: 'absolute',
    bottom: 0,
  },
  containerImageAndSticker: {
    overflow: 'hidden',
    flex: 1,
  },
  imageBackgroundContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default PostEditorScreen;
