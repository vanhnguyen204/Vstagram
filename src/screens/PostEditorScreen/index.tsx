import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import {
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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
import ViewShot from 'react-native-view-shot';
import {PageName} from '../../config/PageName.ts';
import ModalMusic from './components/ModalMusic.tsx';
import {musicStore} from '../../hooks/useMusic.ts';
import TrackPlayer from 'react-native-track-player';
import {globalStyle} from '../../styles/globalStyle.ts';
import ListColor from './components/ListColor.tsx';
import StoryBarEditor from './components/StoryBarEditor.tsx';
const PostEditorScreen = () => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const {setMusicPlaying, setUrlMusicPlaying} = musicStore();
  const {
    stickers,
    clearStickerStory,
    toggleModalSticker,
    toggleModalMusic,
    textColor,
  } = useStoryStore();
  const [topEdgePosition, setTopEdgePosition] = useState(0);
  const [bottomEdgePosition, setBottomEdgePosition] = useState(0);
  const binOffset = useSharedValue<number>(200);
  const videoRef = useRef<VideoRef>(null);
  const textInputRef = useRef<TextInput>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const [videoDuration, setVideoDuration] = useState(0);
  const toggleInput = useCallback(() => {
    setIsShowInput(pre => !pre);
  }, []);
  const panInput = useRef(new Animated.ValueXY()).current;
  const panResponderInput = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (event, gestureState) => {
        panInput.setValue({x: gestureState.dx, y: gestureState.dy});
        const currentX = panInput.x._value;
        const currentY = panInput.y._value;

        if (currentY < AppInfor.height - bottomEdgePosition) {
          showBinRemoveSticker();
        }
      },
      onPanResponderRelease: () => {
        panInput.extractOffset(); // reset value of useRef of panresponder

        hideBinRemoveSticker();
      },
    }),
  ).current;
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
  // select media
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
  //Check type of media
  const subType = useMemo(() => {
    let index = mediaSelected?.type.indexOf('/');
    let type = mediaSelected?.type.substring(0, index);
    return type;
  }, [mediaSelected?.type]);
  // Trash animation style
  const binAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: binOffset.value}],
  }));

  const showBinRemoveSticker = useCallback(() => {
    binOffset.value = withTiming(-100, {duration: 200});
  }, [binOffset]);
  const hideBinRemoveSticker = useCallback(() => {
    binOffset.value = withTiming(100, {duration: 200});
  }, [binOffset]);
  // set up text editor
  const textEditorOffset = useSharedValue<number>(200);
  const showTextColorEditor = useCallback(() => {
    textEditorOffset.value = withTiming(-100, {duration: 200});
  }, [textEditorOffset]);
  const hideTextColorEditor = useCallback(() => {
    textEditorOffset.value = withTiming(100, {duration: 200});
  }, [textEditorOffset]);
  const textEditorAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: binOffset.value}],
  }));
  useEffect(() => {
    const onPlaybackStateChange = async (data: any) => {
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
  //Cancel edit story
  const onCloseStoryEditor = useCallback(() => {
    goBackNavigation();
    clearStickerStory();
    setMusicPlaying('');
    setUrlMusicPlaying('');
    TrackPlayer.reset();
    TrackPlayer.pause();
  }, [clearStickerStory, setMusicPlaying, setUrlMusicPlaying]);
  useEffect(() => {
    if (isShowInput) {
      textInputRef.current && textInputRef.current.focus();
      // showTextColorEditor();
    } else {
      // hideTextColorEditor();
    }
  }, [hideTextColorEditor, isShowInput, showTextColorEditor]);
  //Render media has type video
  const listColorOpacityShow = useSharedValue(0);
  const toggleShowListColor = useCallback(() => {
    listColorOpacityShow.value = withTiming(
      listColorOpacityShow.value === 0 ? 1 : 0,
    );
  }, [listColorOpacityShow]);
  const listColorAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: listColorOpacityShow.value,
    };
  });

  if (subType === 'video') {
    return (
      <Container justifyContent="flex-start">
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
      </Container>
    );
  }
  // const r = require('../../assets/fonts/DancingScript.ttf')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.containerStyle]}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container justifyContent={'flex-start'}>
          <ImageBackground
            style={[styles.imageBackgroundContainer]}
            blurRadius={20}
            source={{uri: mediaSelected?.uri}}
            resizeMode={'cover'}>
            {/* modal show sticker */}
            <ModalSticker />
            {/* modal show list music */}
            <ModalMusic />
            {/* Capture this view and export image that's includes text and
            sticker */}
            <ViewShot
              ref={viewShotRef}
              style={[styles.containerImageAndSticker]}>
              {/*Show input */}

              {isShowInput ? (
                <Animated.View
                  style={[
                    {
                      transform: [
                        {translateX: panInput.x},
                        {translateY: panInput.y},
                      ],
                    },
                    styles.textContainer,
                  ]}>
                  <TextInput
                    style={{
                      color: textColor,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}
                    value={valueInput}
                    ref={textInputRef}
                    onChangeText={(value: string) => {
                      setValueInput(value);
                    }}
                  />
                </Animated.View>
              ) : (
                <Animated.View
                  style={[
                    {
                      transform: [
                        {translateX: panInput.x},
                        {translateY: panInput.y},
                      ],
                    },
                    styles.textContainer,
                  ]}
                  {...panResponderInput.panHandlers}>
                  <TextComponent
                    fontSize={24}
                    fontFamily="../../assets/fonts/AntDesign"
                    color={textColor}
                    value={valueInput}
                    fontWeight="bold"
                  />
                </Animated.View>
              )}
              {/* Image has been selected */}
              <ImageComponent
                resizeMode={'contain'}
                width={AppInfor.width}
                height={undefined}
                flex={1}
                src={{uri: mediaSelected?.uri}}
              />

              {stickers.map((item, index) => {
                return (
                  //sticker has been selected
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
            {/* Editor bar  */}
            {isShowInput ? (
              <Box
                position="absolute"
                top={10}
                right={0}
                left={0}
                padding={2}
                flexDirection={'row'}
                justifyContent={'flex-end'}>
                <ButtonComponent
                  name="Xong"
                  fontSize={18}
                  onPress={() => {
                    toggleShowListColor();
                    toggleInput();
                  }}
                />
              </Box>
            ) : (
              <StoryBarEditor
                onCloseStoryEditor={onCloseStoryEditor}
                toggleInput={toggleInput}
                toggleShowListColor={toggleShowListColor}
                toggleModalSticker={toggleModalSticker}
                toggleModalMusic={toggleModalMusic}
                onCapture={onCapture}
              />
            )}

            {/* Trash to remove sticker and text */}
            <AnimatedReanimated.View
              style={[binAnimatedStyles, styles.binStyle]}>
              <ImageComponent
                width={30}
                tintColor={appColors.white}
                height={30}
                src={require('../../assets/icons/trash-bin.png')}
              />
            </AnimatedReanimated.View>
            {/* Show list color when edit text */}
            <AnimatedReanimated.View
              style={[listColorAnimatedStyle, styles.listColorStyle]}>
              <ListColor colors={appColors.colorsStoryTextEditor} />
            </AnimatedReanimated.View>
          </ImageBackground>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    alignContent: 'center',
    top: AppInfor.height * 0.2,
    zIndex: 999,
  },
  binStyle: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  listColorStyle: {position: 'absolute', bottom: 20},
});
export default PostEditorScreen;
