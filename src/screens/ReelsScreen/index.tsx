import {SafeAreaView, StatusBar} from 'react-native';
import React, {useState} from 'react';

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
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { BottomTabParams } from "../../navigators/BottomTabParams.ts";

type ReelProps = RouteProp<BottomTabParams, 'Reel'>;
type ReelNavigationProp = NativeStackNavigationProp<BottomTabParams, 'Reel'>;

type Props = {
  route: ReelProps;
  navigation: ReelNavigationProp;
};

const ReelsScreen = (props: Props) => {
  const {navigation} = props;
  const isFocusedScreen = useIsFocused();
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const statusBarHeight = StatusBar.currentHeight ?? 44;
  const bottomBarHeight = useBottomTabBarHeight();

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
            <ReelCard
              item={item}
              isFocused={index === activeVideo && isFocusedScreen}
            />
          )}
        />
      </Container>
    </SafeAreaProvider>
  );
};

export default ReelsScreen;
