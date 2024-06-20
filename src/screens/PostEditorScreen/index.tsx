import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';
// @ts-ignore
import Video, {VideoRef} from 'react-native-video';
import TextComponent from '../../components/TextComponent.tsx';
import ModalSticker from './components/ModalSticker.tsx';
import {musicStore, useStoryEditor} from '../../hooks';
import StickerSelected from './components/StickerSelected.tsx';
import AnimatedReanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import ModalMusic from './components/ModalMusic.tsx';
import TrackPlayer from 'react-native-track-player';
import {globalStyle} from '../../styles/globalStyle.ts';
import ListColor from './components/ListColor.tsx';
import StoryBarEditor from './components/StoryBarEditor.tsx';
import ListFont from './components/ListFont.tsx';
import fonts from '../../assets/fonts';
import SliderComponent from '../../components/SliderComponent.tsx';
import Modal from 'react-native-modal';
import {handleUpStory} from '../../services/apis';
import ModalLoading from '../../components/ModalLoading.tsx';
import FastImage from 'react-native-fast-image';

const PostEditorScreen = () => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const {setMusicPlaying, setUrlMusicPlaying, urlMusicPlaying} = musicStore();

  const {
    stickers,
    clearStickerStory,
    toggleModalSticker,
    toggleModalMusic,
    textColor,
    font,
    fontSize,
    setFontSize,
    musicSelected,
  } = useStoryEditor();
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
        // const currentX = panInput.x._value;
        // @ts-ignore
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
  const chooseMedia = useCallback(() => {
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
    return mediaSelected?.type.substring(0, index);
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
      // console.log('Playback state changed', data);
      if (data.state === 'ended') {
        setMusicPlaying('');
      }
    };
    // @ts-ignore
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
  const [imageCapture, setImageCapture] = useState<{
    uriCap: string;
    uriOriginal: string;
  }>({uriCap: '', uriOriginal: ''});
  const onCapture = useCallback(() => {
    toggleImageBackgroundSale();
    if (viewShotRef.current?.capture) {
      viewShotRef.current
        .capture()
        .then(uri => {
          setImageCapture({
            uriCap: uri,
            uriOriginal: mediaSelected.uri,
          });
        })
        .catch(error => {
          console.error('Error capturing the view:', error);
        });
    } else {
      console.error('Capture function is not available');
    }
  }, [mediaSelected?.uri]);

  //Cancel edit story
  const onCloseStoryEditor = useCallback(() => {
    goBackNavigation();
    clearStickerStory();
    setMusicPlaying('');
    setUrlMusicPlaying('');
    TrackPlayer.reset();
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

  const [showListColorOrFont, setShowListColorOrFont] =
    useState<boolean>(false);
  const toggleShowListColorOrFont = useCallback((value: boolean) => {
    setShowListColorOrFont(value);
  }, []);

  const heightImageBackground = useSharedValue(0);
  console.log('Height background', heightImageBackground);
  const scaleImageBackground = useSharedValue(1);
  const toggleImageBackgroundSale = useCallback(() => {
    scaleImageBackground.value = imageCapture.uriCap === '' ? 0.6 : 1;
  }, [imageCapture?.uriCap, scaleImageBackground]);

  const animatedStyleImageBackground = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: withTiming(scaleImageBackground.value, {duration: 500})},
        {
          translateY: withTiming(
            imageCapture.uriCap === '' ? 0 : -(AppInfor.height / 3.3),
            {duration: 500},
          ),
        },
      ],
    };
  });
  const opacityBottomEditor = useSharedValue(1);
  const heightBottomEditor = useSharedValue(50);
  useEffect(() => {
    if (imageCapture.uriCap === '') {
      opacityBottomEditor.value = 1;
      heightBottomEditor.value = 50;
    } else {
      opacityBottomEditor.value = 0;
      heightBottomEditor.value = 0;
    }
  }, [heightBottomEditor, imageCapture.uriCap, opacityBottomEditor]);
  const modalShareStoryFeat = [
    {
      id: '1',
      image: require('../../assets/icons/user-avatar.png'),
      text: 'Tin của bạn',
    },
    {
      id: '2',
      image: require('../../assets/icons/user-avatar.png'),
      text: 'Bạn thân',
    },
    {
      id: '3',
      image: require('../../assets/icons/user-avatar.png'),
      text: 'Tin nhắn',
    },
    {
      id: '4',
      image: require('../../assets/icons/user-avatar.png'),
      text: 'Người yêu',
    },
  ];
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  // console.log('Is modal loading: ', isModalLoading);
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyle.containerStyle]}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container justifyContent={'flex-start'} alignItems={'flex-start'}>
          <ModalLoading isShow={isModalLoading} />
          <AnimatedReanimated.View style={[animatedStyleImageBackground]}>
            {/* Modal show sticker */}
            <ModalSticker />
            {/* Modal show list music */}
            <ModalMusic />

            {/* Capture this view and export image that's includes text and
            sticker */}

            <ViewShot
              ref={viewShotRef}
              style={[styles.containerImageAndSticker]}>
              <ImageBackground
                style={[styles.imageBackgroundContainer]}
                blurRadius={20}
                source={{uri: mediaSelected?.uri}}
                resizeMode={'cover'}>
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
                        fontFamily: font,
                        fontSize: fontSize,
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
                        opacity: imageCapture.uriCap !== '' ? 0 : 1,
                      },
                      styles.textContainer,
                    ]}
                    {...panResponderInput.panHandlers}>
                    <TextComponent
                      fontSize={fontSize}
                      fontFamily={font}
                      color={textColor}
                      value={valueInput}
                    />
                  </Animated.View>
                )}
                {/* Image has been selected */}
                <ImageComponent
                  resizeMode={'contain'}
                  width={AppInfor.width}
                  height={undefined}
                  flex={1}
                  // style={{backgroundColor: 'white'}}
                  src={{
                    uri:
                      imageCapture?.uriCap !== ''
                        ? imageCapture.uriCap
                        : mediaSelected?.uri,
                  }}
                />
                {/*Render sticker*/}
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
              </ImageBackground>
            </ViewShot>
            {/* Editor bar  */}
            {isShowInput ? (
              <Box
                position="absolute"
                top={10}
                right={0}
                left={0}
                justifyContent={'center'}
                padding={2}
                alignItems={'center'}
                flexDirection={'row'}>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <ButtonComponent
                    borderColor={appColors.white}
                    name={'Select font'}
                    onPress={() => {
                      toggleShowListColorOrFont(false);
                    }}>
                    <ImageComponent
                      src={require('../../assets/icons/typography.png')}
                      height={30}
                      width={30}
                    />
                  </ButtonComponent>

                  <Box flexDirection={'column'}>
                    <ButtonComponent
                      padding={0}
                      radius={99}
                      marginHorizontal={5}
                      borderWidth={2}
                      borderColor={appColors.white}
                      name={'Select color'}
                      onPress={() => {
                        toggleShowListColorOrFont(true);
                      }}>
                      <ImageComponent
                        src={require('../../assets/icons/colour.png')}
                        height={30}
                        width={30}
                      />
                    </ButtonComponent>
                  </Box>
                </Box>
                <ButtonComponent
                  alignSelf={'center'}
                  style={{position: 'absolute', right: 10}}
                  name="Xong"
                  fontSize={18}
                  onPress={() => {
                    toggleShowListColor();
                    toggleInput();
                  }}
                />
                <Box position={'absolute'} top={AppInfor.height / 4} left={-70}>
                  <SliderComponent
                    value={fontSize}
                    onValueChange={value => setFontSize(value)}
                  />
                </Box>
              </Box>
            ) : (
              <StoryBarEditor
                opacity={imageCapture.uriCap !== '' ? 0 : 1}
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
            {/* Show list color or list font when edit text */}
            <AnimatedReanimated.View
              style={[listColorAnimatedStyle, styles.listFontStyle]}>
              {showListColorOrFont ? (
                <ListColor colors={appColors.colorsStoryTextEditor} />
              ) : (
                <ListFont fonts={fonts.fontsStory} />
              )}
            </AnimatedReanimated.View>
          </AnimatedReanimated.View>

          {imageCapture.uriCap !== '' && (
            <Modal
              isVisible={imageCapture.uriCap !== ''}
              onSwipeComplete={() => {
                setImageCapture({uriCap: '', uriOriginal: ''});
                toggleImageBackgroundSale();
              }}
              swipeDirection={['down']}
              animationIn={'slideInUp'}
              animationOut={'fadeOut'}
              avoidKeyboard={true}
              scrollHorizontal={true}
              animationInTiming={500}
              animationOutTiming={500}
              style={[{margin: 0}]}
              propagateSwipe={true}
              backdropOpacity={0}
              backdropTransitionInTiming={500}
              backdropTransitionOutTiming={500}
              swipeThreshold={150}>
              <View
                style={{
                  flex: 1,
                  height: AppInfor.height / 2.6,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}>
                <Box
                  flex={1}
                  radius={20}
                  padding={10}
                  backgroundColor={appColors.black900}
                  alignSelf={'stretch'}>
                  <Box
                    style={styles.viewHorizontalTop}
                    marginVertical={10}
                    radius={20}
                    alignSelf={'center'}
                    backgroundColor={appColors.gray}>
                    <View />
                  </Box>
                  <TextComponent value={'Chia sẻ tin'} />
                  <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={modalShareStoryFeat}
                    renderItem={({item}) => (
                      <Box
                        alignSelf={'stretch'}
                        flexDirection={'row'}
                        marginVertical={5}>
                        <ImageComponent
                          src={item.image}
                          height={40}
                          width={40}
                        />
                        <TextComponent
                          value={item.text}
                          marginHorizontal={10}
                        />
                      </Box>
                    )}
                  />
                  <ButtonComponent
                    padding={10}
                    radius={20}
                    onPress={async () => {
                      setIsModalLoading(true);
                      const formData = new FormData();
                      formData.append('music', urlMusicPlaying);
                      formData.append('type', 'photo');
                      formData.append('duration', 15);
                      formData.append('file', {
                        uri: imageCapture?.uriCap,
                        type: 'image/png',
                        name: imageCapture?.uriCap,
                      });
                      handleUpStory(formData)
                        .then(response => {
                          if (response.code === 201) {
                            setIsModalLoading(false);
                            goBackNavigation();
                            clearStickerStory();
                          }
                        })
                        .catch(e => {
                          console.log(e);
                          setIsModalLoading(false);
                        });
                    }}
                    marginVertical={15}
                    name={'Chia sẻ'}
                    backgroundColor={appColors.blue500}>
                    {isModalLoading && (
                      <Box flexDirection={'row'}>
                        <ActivityIndicator
                          color={appColors.white}
                          size={'small'}
                        />
                        <TextComponent
                          marginHorizontal={5}
                          value={'Đang tạo story...'}
                        />
                      </Box>
                    )}
                  </ButtonComponent>
                </Box>
              </View>
            </Modal>
          )}
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
    // alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    flex: 1,
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
    zIndex: 99,
  },
  listColorStyle: {position: 'absolute', bottom: 20},
  listFontStyle: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    alignSelf: 'center',
  },
  viewHorizontalTop: {
    width: 40,
    height: 5,
    borderRadius: 20,
    overflow: 'visible',
  },
});
export default PostEditorScreen;
