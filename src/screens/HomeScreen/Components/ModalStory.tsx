import React, {
  memo,
  Ref, RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import TextComponent from '../../../components/TextComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import Container from '../../../components/Container.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import app from '../../../../App.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import App from '../../../../App.tsx';
interface ModalStoryProps {
  isVisible: boolean;
  onClose: () => void;
  dataStory: any;
}
const ModalStory = (props: ModalStoryProps) => {
  const {isVisible, onClose, dataStory} = props;
  const [scrollOffset, setScrollOffset] = useState<number | undefined>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: {x?: number; y: number}) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      avoidKeyboard={true}
      style={{margin: 0}}
      scrollHorizontal={true}
      propagateSwipe={true}
      scrollOffsetMax={400 - 300}
      scrollTo={handleScrollTo}
      backdropTransitionOutTiming={200}
      scrollOffset={scrollOffset}
      swipeThreshold={250}>
      <StoryItemDetails dataStory={dataStory} />
    </Modal>
  );
};

interface StoryItemDetails {
  dataStory: any;
}
const StoryItemDetails = memo((props: StoryItemDetails) => {
  const {dataStory} = props;
  const [currentStory, setCurrentStory] = useState(dataStory[0]);
  const carouselRef = useRef<Carousel<any>>(null);

  return (
    <Box
      position="absolute"
      style={[
        {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: AppInfor.width,
          height: AppInfor.height,
          bottom: 0,
        },
      ]}
      alignItems={'center'}
      backgroundColor={'rgba(0,0,0, 0.5)'}>
      <Carousel
        ref={carouselRef}
        itemHeight={AppInfor.height}
        itemWidth={AppInfor.width}
        sliderWidth={AppInfor.width}
        data={dataStory}
        horizontal={true}
        loop={false}
        scrollEnabled={false}
        inactiveSlideScale={0.75}
        inactiveSlideOpacity={0.75}
        activeAnimationType={'spring'}
        slideStyle={{display: 'flex', alignItems: 'center'}}
        renderItem={({item, index}) => (
          <StoryUserDetail
            index={index}
            carouselRef={carouselRef}
            dataStory={dataStory}
          />
        )}
      />

      {/*</ScrollView>*/}
    </Box>
  );
});
interface StoryUserDetailProps {
  index: number;
  carouselRef: RefObject<Carousel<any>>;
  dataStory: any;
}
const StoryUserDetail = memo((props: StoryUserDetailProps) => {
  let {index, carouselRef, dataStory} = props;
  const [storySaw, setStorySaw] = useState<number[]>([0]);
  const translateX = useSharedValue(-AppInfor.width);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  useEffect(() => {
    translateX.value = withTiming(0, {duration: 15000});
  }, [index]);
  return (
    <ImageBackground
      blurRadius={20}
      resizeMode={'cover'}
      style={{
        flex: 1,
        marginTop: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        overflow: 'hidden',
      }}
      source={require('../../../assets/icons/icon-app.png')}>
      <Box
        position={'absolute'}
        top={10}
        zIndex={99}
        flexDirection={'row'}
        right={5}
        left={5}
        overflow={'hidden'}
        justifyContent={'space-between'}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: appColors.gray,
              height: 5,
              marginHorizontal: 2,
              borderRadius: 50,
            },
          ]}>
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: appColors.white,
                height: 5,
                marginHorizontal: 2,
                borderRadius: 50,
              },
              animatedStyle,
            ]}
          />
        </View>
      </Box>
      <View
        style={{
          flex: 1,
          width: AppInfor.width,
          height: AppInfor.height,
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            left: 0,
            right: 0,
            top: AppInfor.height / 2,
            bottom: 0,
          }}>
          <Pressable
            onPress={() => {
              console.log('Left press');
              if (index > 0) {
                carouselRef?.current?.snapToItem(--index);
                setStorySaw(prevState =>
                  prevState.filter(
                    item => item !== carouselRef?.current?.currentIndex,
                  ),
                );
              }
            }}
            style={{flex: 1, backgroundColor: appColors.transparent}}
          />
          <Pressable
            onPress={() => {
              console.log('Right press');
              if (index < dataStory.length) {
                carouselRef?.current?.snapToItem(++index);
                setStorySaw(prevState => [...prevState, index]);
              }
            }}
            style={{flex: 1, backgroundColor: appColors.transparent}}
          />
        </View>
        <TextComponent value={index.toString()} />
      </View>
    </ImageBackground>
  );
});
export default ModalStory;
