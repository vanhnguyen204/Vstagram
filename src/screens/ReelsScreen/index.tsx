import {AppState, SafeAreaView, StatusBar} from 'react-native';
import React, { useEffect, useRef, useState } from "react";

import {mockReels} from '../../models/Mockup.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import ReelCard from './components/ReelCard.tsx';
import Carousel from 'react-native-reanimated-carousel';
import Container from '../../components/Container.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ModalComment from '../../components/ModalComment.tsx';
import Header from './components/Header.tsx';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import {RootStackParams, ROUTES} from '../../navigators';
import { RouteProp, useFocusEffect, useIsFocused } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { VideoRef } from "react-native-video";
type ReelsProps = RouteProp<RootStackParams, 'Reels'>;
type ReelsNavigationProp = NativeStackNavigationProp<RootStackParams, 'Reels'>;

type Props = {
  route: ReelsProps;
  navigation: ReelsNavigationProp;
};

const ReelsScreen = (props: Props) => {
  const {navigation} = props;
  const videoRef= useRef<VideoRef>(null)
  const isFocusedScreen = useIsFocused()
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const statusBarHeight = StatusBar.currentHeight ?? 44;
  const bottomBarHeight = useBottomTabBarHeight();
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onScreenFocus = () => {
  //      setIsPlaying(true)
  //       console.log('Focus');
  //     };
  //
  //     const onScreenBlur = () => {
  //       setIsPlaying(false)
  //       console.log('Blur');
  //     };
  //
  //     const focusListener = navigation.addListener('focus', onScreenFocus);
  //     const blurListener = navigation.addListener('blur', onScreenBlur);
  //
  //     return () => {
  //       focusListener();
  //       blurListener();
  //     };
  //   }, [navigation])
  // );
  return (
    <SafeAreaProvider>
      <Container justifyContent={'center'} alignItems={'center'}>
        <ModalComment />
        <SafeAreaView
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: statusBarHeight,
            zIndex: 99,
          }}>
          <Header
            onCameraOpen={() => {
              navigatePush(ROUTES.Capture);
            }}
          />
        </SafeAreaView>
        <Carousel
          style={{flex: 1}}
          height={AppInfor.height - statusBarHeight - bottomBarHeight - 20}
          width={AppInfor.width}
          data={mockReels}
          vertical={true}
          onSnapToItem={index => setActiveVideo(index)}
          loop={false}
          renderItem={({item, index}) => (
            <ReelCard videoRef={videoRef} item={item} isFocused={index === activeVideo && isFocusedScreen} />
          )}
        />
      </Container>
    </SafeAreaProvider>
  );
};

export default ReelsScreen;
