import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import {
  Animated,
  ImageBackground,
  ImageProps,
  PanResponder,
  StyleSheet,
  Text,
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
import {useStoryStore} from '../../hooks/useStoryEditor.ts';

const PostEditorScreen = () => {
  const {setSticker, stickers, clearStickerStory} = useStoryStore();

  const videoRef = useRef<VideoRef>(null);
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
  const chooseMedia = useCallback(() => {
    launchImageLibrary({
      mediaType: 'mixed',
      maxHeight: AppInfor.height / 2,
    })
      .then(res => {
        console.log(res);
        if (res.didCancel) {
          return goBackNavigation();
        } else {
          res.assets && setMediaSelected(res.assets[0]);
        }
      })
      .catch(e => {
        console.log('error library', e);
      });
  }, []);
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
  const [isVisibleModalSticker, setIsVisibleModalSticker] = useState(false);
  const toggleModalSticker = () => {
    setIsVisibleModalSticker(!isVisibleModalSticker);
  };
  useEffect(() => {
    console.log(stickers.length);
  }, [stickers.length]);
  return (
    <Container justifyContent={'flex-start'}>
      <ImageBackground
        blurRadius={20}
        style={{flex: 1}}
        source={{uri: mediaSelected?.uri}}
        resizeMode={'cover'}>
        <ModalSticker
          isVisible={isVisibleModalSticker}
          onClose={toggleModalSticker}
        />
        <Box
          padding={2}
          alignSelf={'stretch'}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <ButtonComponent
            backgroundColor={appColors.black900}
            padding={3}
            alignSelf={'center'}
            marginHorizontal={5}
            name={'Close'}
            onPress={() => {
              goBackNavigation();
              clearStickerStory();
            }}>
            <ImageComponent
              resizeMode={'contain'}
              tinColor={appColors.white}
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
                toggleModalSticker();
              }}>
              <ImageComponent
                tinColor={appColors.white}
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
              onPress={() => {}}>
              <ImageComponent
                tinColor={appColors.white}
                src={require('../../assets/icons/musical-note.png')}
                width={25}
                height={25}
              />
            </ButtonComponent>
          </Box>
        </Box>
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
          <ImageComponent
            resizeMode={'contain'}
            width={AppInfor.width}
            height={500}
            src={{uri: mediaSelected?.uri}}
          />
        )}
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
});
export default PostEditorScreen;
