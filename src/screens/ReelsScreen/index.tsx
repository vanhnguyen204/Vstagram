import {FlatList, View, AppState, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

import {mockReels} from '../../models/Mockup.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import Video from 'react-native-video';
import {appColors} from '../../assets/colors/appColors.ts';
import ReelCard from './components/ReelCard.tsx';
import Carousel from 'react-native-reanimated-carousel';
import Container from '../../components/Container.tsx';
import {screenHeightIncludeNavBar} from '../../utils/Responsive.ts';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';

const ReelsScreen = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  // Play or pause video based on current index and visibility

  // Listen to app state changes to pause or play video
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'active' && isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    return () => {
      AppState.addEventListener('change', handleAppStateChange);
    };
  }, [isPlaying]);
  const statusBarHeight = StatusBar.currentHeight ?? 44;
  const bottomBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaProvider>
      <Container justifyContent={'center'} alignItems={'center'}>

        <SafeAreaView
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: statusBarHeight,
            zIndex: 99,
          }}>
          <Box
            padding={10}
            flexDirection={'row'}
            justifyContent={'space-between'}>
            <TextComponent value={'Reels'} fontSize={24} fontWeight={'600'} />
            <ButtonComponent
              activeOpacity={1}
              scaleInValue={0.7}
              scaleAnimated={true}
              radius={99}
              onPress={() => {}}>
              <ImageComponent
                tintColor={appColors.white}
                resizeMode={'contain'}
                src={require('../../assets/icons/camera.png')}
                height={30}
                width={30}
              />
            </ButtonComponent>
          </Box>
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
            <ReelCard item={item} isFocused={index === activeVideo} />
          )}
        />
      </Container>
    </SafeAreaProvider>
  );
};

export default ReelsScreen;
