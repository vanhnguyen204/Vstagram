import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, View, ViewToken} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ReelCard, {ReelCardHandle} from './components/ReelCard.tsx';
import {mockReels} from '../../models/Mockup.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import Header from './components/Header.tsx';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import {ROUTES} from '../../navigators';
import {Reel} from '../../models/Reel.ts';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../stores/store.ts';
import {handleGetReels} from '../../stores/reel/reelActions.ts';

const ReelsScreen = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch<AppDispatch>();
  const reels = useSelector<RootState>(state => state.reels);
  const statusBarHeight = StatusBar.currentHeight ?? 44;
  const [viewableReels, setViewableReels] = useState<Reel | null>(null);
  const reelsRefs = useRef<(ReelCardHandle | null)[]>([]);
  const isScreenFocus = useIsFocused();

  useEffect(() => {
    dispatch(handleGetReels());
  }, [dispatch]);

  const renderItemReels = useCallback(
    ({item, index}: {item: Reel; index: number}) => {
      return (
        <ReelCard
          ref={ref => (reelsRefs.current[index] = ref)}
          index={index}
          item={item}
          isFocused={item._id === viewableReels?._id && isScreenFocus}
        />
      );
    },
    [isScreenFocus, viewableReels?._id],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const viewableRes: Reel[] = viewableItems.map(item => item.item);
      if (viewableRes.length > 0) {
        const currentlyViewable = viewableRes[0];
        if (viewableReels?._id !== currentlyViewable._id) {
          setViewableReels(currentlyViewable);
        }
      }
    },
    [viewableReels?._id],
  );
  console.log('render-reel');
  return (
    <View style={{backgroundColor: appColors.backgroundApp}}>
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
      <FlatList
        data={reels.data}
        renderItem={renderItemReels}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        onEndReachedThreshold={0.5}
        decelerationRate={'fast'}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd <= 0) {
            return;
          }
          if (reels.nextPage) {
            dispatch(handleGetReels(5, reels.nextPage));
          }
        }}
        snapToInterval={AppInfor.height - bottomTabHeight}
        snapToAlignment={'center'}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default ReelsScreen;
