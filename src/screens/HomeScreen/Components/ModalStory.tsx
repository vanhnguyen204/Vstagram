import React, {useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {Story} from '../../../models/Story.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import {Event, State, useTrackPlayerEvents} from 'react-native-track-player';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {AppInfor} from '../../../constants/AppInfor.ts';
import StoryDetails from './StoryDetails.tsx';
import {stopTrack} from '../../../../service';
import {TestStory} from '../index.tsx';

import Box from '../../../components/Box.tsx';
import Container from '../../../components/Container.tsx';
import {mockStories} from '../../../models/Mockup.ts';

interface ModalStoryProps {
  isVisible: boolean;
  onClose: () => void;
  stories: Story[];
}

const ModalStory = (props: ModalStoryProps) => {
  const {isVisible, onClose, stories} = props;
  useTrackPlayerEvents([Event.PlaybackState], event => {
    switch (event.state) {
      case State.Playing:
      case State.Buffering:
      case State.Error:
      case State.Loading:
      case State.Ended:
      case State.Ready:
      case State.Stopped:
      case State.Paused:
    }
  });

  const carouselRef = useRef<ICarouselInstance>(null);
  const currentStoryFocus = useRef<number>(0);
  return (
    <Modal
      onSwipeComplete={() => onClose()}
      swipeDirection={['down']}
      animationIn={'slideInUp'}
      animationOut={'fadeOut'}
      avoidKeyboard={true}
      scrollHorizontal={true}
      style={{margin: 0}}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      swipeThreshold={250}
      isVisible={isVisible}>
      <Container justifyContent={'flex-start'}>
        <Carousel
          overscrollEnabled={true}
          ref={carouselRef}
          width={AppInfor.width}
          height={AppInfor.height}
          vertical={false}
          loop={false}
          maxScrollDistancePerSwipe={200}
          data={mockStories}
          onSnapToItem={index => (currentStoryFocus.current = index)}
          renderItem={({item, index}) => (
            <StoryDetails
              onProgressFinish={currentIndex => {
                if (currentIndex + 1 >= item.dataStories.length) {
                  if (carouselRef.current) {
                    console.log('current index: ' + currentIndex);
                    carouselRef.current.next();
                  }
                }
              }}
              itemStory={item}
              currentIndexFocus={currentStoryFocus.current}
              indexStories={index}
              carouselRef={carouselRef}
              onNext={currentIndex => {
                console.log('On Next Page, current index: ' + currentIndex);
                if (currentIndex === item.dataStories.length - 1) {
                  if (carouselRef.current) {
                    console.log('current index: ' + currentIndex);
                    carouselRef.current.scrollTo({index: currentIndex + 1});
                  }
                }
              }}
              onPrev={currentIndex => {
                console.log(currentIndex);
                if (currentIndex === 0) {
                  if (carouselRef.current) {
                    carouselRef.current.prev({count: 1});
                  }
                }
              }}
              onClose={onClose}
              visible={isVisible}
            />
          )}
        />
      </Container>
    </Modal>
  );
};

export default ModalStory;
