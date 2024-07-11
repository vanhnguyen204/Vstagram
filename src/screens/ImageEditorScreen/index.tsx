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
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';

import TextComponent from '../../components/TextComponent.tsx';
import ModalSticker from './components/ModalSticker.tsx';
import {musicStore, TextElement, useStoryEditor} from '../../hooks';
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
import {Music} from '../../models';
import {RootStackParams} from '../../navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TextEditorLayer from './components/TextEditorLayer.tsx';
import InputDraggable from '../../components/InputDraggable.tsx';
type ImageEditorProps = RouteProp<RootStackParams, 'ImageEditorScreen'>;
type ImageEditorNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ImageEditorScreen'
>;

type Props = {
  route: ImageEditorProps;
  navigation: ImageEditorNavigationProp;
};
export type InputEditorTypeCreate = {
  visible: boolean;
  type: 'CREATE';
};
export type InputEditorTypeEdit = {
  visible: boolean;
  type: 'EDIT';
  element: TextElement;
};
const ImageEditorScreen = (props: Props) => {
  const {image} = props.route.params;
  const [inputEditor, setInputEditor] = useState<
    InputEditorTypeCreate | InputEditorTypeEdit
  >({
    visible: false,
    type: 'CREATE',
  });
  const {setMusicPlaying} = musicStore();

  const {
    texts,
    addNewText,
    updateText,
    removeText,
    stickerSelected,
    clearStickerStory,
    toggleModalSticker,
    toggleModalMusic,
    textColor,
    font,
    fontSize,
    setFontSize,
    handleRemoveSticker,
    musicSelected,
  } = useStoryEditor();
  const viewShotRef = useRef<ViewShot>(null);

  const toggleInput = useCallback(() => {
    setInputEditor(pre => ({...pre, type: 'CREATE', visible: !pre.visible}));
  }, []);
  const [imageCapture, setImageCapture] = useState<{
    uriCap: string;
    uriOriginal: string;
  }>({uriCap: '', uriOriginal: ''});
  const scaleImageBackground = useSharedValue(1);
  const toggleImageBackgroundSale = useCallback(() => {
    scaleImageBackground.value = imageCapture.uriCap === '' ? 0.6 : 1;
  }, [imageCapture?.uriCap, scaleImageBackground]);
  const onCapture = useCallback(() => {
    toggleImageBackgroundSale();
    if (viewShotRef.current?.capture) {
      viewShotRef.current
        .capture()
        .then(uri => {
          setImageCapture({
            uriCap: uri,
            uriOriginal: image.uri,
          });
        })
        .catch(error => {
          console.error('Error capturing the view:', error);
        });
    } else {
      console.error('Capture function is not available');
    }
  }, [image.uri, toggleImageBackgroundSale]);

  //Cancel edit story
  const onCloseStoryEditor = useCallback(() => {
    goBackNavigation();
    clearStickerStory();
  }, [clearStickerStory]);

  //Render media has type video
  const listColorOpacityShow = useSharedValue(0);
  const toggleShowListColor = useCallback(() => {
    listColorOpacityShow.value = withTiming(
      listColorOpacityShow.value === 0 ? 1 : 0,
    );
  }, [listColorOpacityShow]);

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

  // handle add new text
  const handleDoneTextEdit = useCallback(
    (textElement: TextElement) => {
      if (textElement.value && inputEditor.type === 'CREATE') {
        addNewText(textElement);
      }
      if (textElement.value && inputEditor.type === 'EDIT') {
        updateText(textElement);
      }
      toggleInput();
    },
    [addNewText, inputEditor.type, toggleInput, updateText],
  );
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
  const handleTextElementFocus = useCallback((value: TextElement) => {
    setInputEditor({
      visible: true,
      type: 'EDIT',
      element: value,
    });
  }, []);
  const handleRemoveText = useCallback(
    (id: string) => {
      removeText(id);
      toggleInput();
    },
    [removeText, toggleInput],
  );
  return (
    <GestureHandlerRootView>
      <Container justifyContent={'flex-start'} alignItems={'flex-start'}>
        <AnimatedReanimated.View style={[animatedStyleImageBackground]}>
          {/* Modal show sticker */}
          <ModalSticker />
          {/* Modal show list music */}
          <ModalMusic
            visible={false}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
            onMusicSelected={function (music: Music): void {
              throw new Error('Function not implemented.');
            }}
          />

          {/* Capture this view and export image that's includes text and
            sticker */}
          <ViewShot ref={viewShotRef} style={[styles.containerImageAndSticker]}>
            <ImageBackground
              style={[styles.imageBackgroundContainer]}
              blurRadius={20}
              source={{uri: image.uri}}
              resizeMode={'cover'}>
              {/*Show input */}
              {/* Image has been selected */}
              <ImageComponent
                src={{
                  uri:
                    imageCapture?.uriCap !== ''
                      ? imageCapture.uriCap
                      : image.uri,
                }}
                style={{width: AppInfor.width, flex: 1}}
                resizeMode={FastImage.resizeMode.contain}
              />
              {/*Render sticker*/}
              {stickerSelected.map((item, index) => {
                return (
                  //sticker has been selected
                  <StickerSelected
                    onRemove={item => handleRemoveSticker(item)}
                    key={index}
                    index={index}
                    item={item}
                  />
                );
              })}
              <Box
                position={'absolute'}
                left={0}
                right={0}
                bottom={0}
                top={AppInfor.height / 3}>
                {texts.map(item => {
                  return (
                    <InputDraggable
                      onFocus={() => handleTextElementFocus(item)}
                      textInputStyle={{
                        fontFamily: item.font,
                        color: item.color ? item.color : appColors.white,
                        fontSize: item.size,
                        opacity:
                          inputEditor.type === 'EDIT' &&
                          inputEditor.element.id == item.id
                            ? 0
                            : 1,
                      }}
                      value={item.value}
                      key={item.id}
                      onPanResponderMove={() => {}}
                      onPanResponderRelease={() => {}}
                      id={item.id}
                    />
                  );
                })}
              </Box>
            </ImageBackground>
          </ViewShot>
          {/* Editor bar  */}
          {inputEditor.visible ? (
            <TextEditorLayer
              onRemove={handleRemoveText}
              onCloseEditor={toggleInput}
              type={inputEditor}
              onDone={handleDoneTextEdit}
            />
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
                      <ImageComponent src={item.image} height={40} width={40} />
                      <TextComponent value={item.text} marginHorizontal={10} />
                    </Box>
                  )}
                />
                <ButtonComponent
                  padding={10}
                  radius={20}
                  onPress={async () => {
                    setIsModalLoading(true);
                    const formData = new FormData();
                    formData.append('music', '');
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  videoStyle: {
    height: 500,
    width: AppInfor.width,
  },
  image: {
    width: AppInfor.width,
    flex: 1,
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
export default ImageEditorScreen;
