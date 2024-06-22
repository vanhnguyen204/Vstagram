import React, {
  memo,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Box from '../../../components/Box.tsx';
import ProgressBar from '../../../components/ProgressBar.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';

import {
  pauseTrack,
  playTrack,
  resumeTrack,
  stopTrack,
} from '../../../../service';
import {View} from 'react-native';
import {mockStories, SetStory} from '../../../models/Mockup.ts';
import {ICarouselInstance} from 'react-native-reanimated-carousel';
import ImageComponent from '../../../components/ImageComponent.tsx';

interface StoryDetailsProps {
  visible: boolean;
  onClose: () => void;
  onNext: (currentIndex: number) => void;
  onPrev: (currentIndex: number) => void;
  carouselRef: Ref<ICarouselInstance>;
  indexStories: number;
  currentIndexFocus: number;
  itemStory: SetStory;
  onProgressFinish: (currentIndex: number) => void;
}

export interface ProgressBarType {
  id: string;
  duration: number;
  started: boolean;
  completed: boolean;
  paused: boolean;
}

const StoryDetails: React.FC<StoryDetailsProps> = (
  props: StoryDetailsProps,
) => {
  const {
    visible,
    indexStories,
    itemStory,
    onClose,
    carouselRef,
    onNext,
    onPrev,
    currentIndexFocus,
    onProgressFinish,
  } = props;

  const [progresses, setProgresses] = useState<ProgressBarType[]>(() =>
    itemStory.dataStories.map(item => ({
      id: item._id,
      duration: item.duration,
      started: false,
      completed: false,
      paused: false,
    })),
  );
  const [activeProgressIndex, setActiveProgressIndex] = useState<number>(0);
  useEffect(() => {
    setProgresses(
      itemStory.dataStories.map(item => ({
        id: item._id,
        duration: item.duration,
        started: false,
        completed: false,
        paused: false,
      })),
    );
    setActiveProgressIndex(0);
  }, [currentIndexFocus, itemStory.dataStories, visible]);

  const currentProgressIndex = useMemo(() => {
    const index = progresses.findIndex(
      progress => progress.started && !progress.completed,
    );
    return index !== -1 ? index : 0;
  }, [progresses]);

  const startNextProgress = useCallback(
    (index: number) => {
      setProgresses(prevProgresses =>
        prevProgresses.map((progress, i) =>
          i === index ? {...progress, started: true} : progress,
        ),
      );
      if (itemStory.dataStories[index].music) {
        playTrack(itemStory.dataStories[index].music);
      }
    },
    [itemStory.dataStories],
  );

  useEffect(() => {
    if (
      activeProgressIndex < progresses.length &&
      indexStories === currentIndexFocus
    ) {
      startNextProgress(activeProgressIndex);
    }
  }, [
    activeProgressIndex,
    currentIndexFocus,
    indexStories,
    progresses.length,
    startNextProgress,
  ]);

  const handleProgressEnd = useCallback(
    (index: number) => {
      setProgresses(prevProgresses =>
        prevProgresses.map((progress, i) =>
          i === index ? {...progress, completed: true} : progress,
        ),
      );
      if (index + 1 < progresses.length) {
        setActiveProgressIndex(index + 1);
      } else {
        onClose();
        stopTrack();
      }
    },
    [onClose, progresses.length],
  );

  return (
    <Box flex={1}>
      <Box
        position={'relative'}
        flexDirection={'row'}
        radius={5}
        top={60}
        zIndex={99}
        paddingHorizontal={10}>
        {progresses.map((item, index) => (
          <ProgressBar
            pause={progresses[index].paused}
            completed={item.completed}
            sizeOfListProgress={progresses.length}
            key={index}
            start={item.started}
            duration={item.duration * 1000}
            color={appColors.red}
            onEnd={() => {
              handleProgressEnd(index);
              onProgressFinish(activeProgressIndex);
            }}
          />
        ))}
        <ButtonComponent onPress={onClose}>
          <ImageComponent
            src={require('../../../assets/icons/close.png')}
            width={20}
            height={20}
          />
        </ButtonComponent>
      </Box>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={{flex: 1, zIndex: 0}}
        source={{uri: itemStory.dataStories[currentProgressIndex]?.image}}
      />
      <Box position={'absolute'} flexDirection={'row'} alignSelf={'center'}>
        <ButtonComponent
          onPress={() => {}}
          activeOpacity={1}
          onLongPress={() => {}}
          onPressIn={() => {}}
          onPressOut={() => {}}
          style={{flex: 1, height: AppInfor.height}}
          name={'OnPrevious'}
        />
        <View style={{flex: 1}} />
        <ButtonComponent
          onLongPress={() => {}}
          onPressIn={() => {}}
          onPressOut={() => {}}
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => {
            onNext(currentProgressIndex);
          }}
          name={'OnNext'}
        />
      </Box>
    </Box>
  );
};

export default memo(StoryDetails);
