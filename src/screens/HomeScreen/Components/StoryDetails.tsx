import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressBar from '../../../components/ProgressBar.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {SetStory} from '../../../models/Mockup.ts';
import {stopTrack} from '../../../../service';

interface StoryDetailsProps {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  itemStory: SetStory;
  enablePlay: boolean;
}

export interface ProgressBarType {
  id: string;
  duration: number;
  started: boolean;
  completed: boolean;
  paused: boolean;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({
  visible,
  itemStory,
  onClose,
  onNext,
  enablePlay,
  onPrev,
}) => {
  const [progresses, setProgresses] = useState<ProgressBarType[]>([]);
  useEffect(() => {
    setProgresses(
      itemStory.dataStories.map((item, index) => ({
        id: item._id,
        duration: item.duration,
        started: index === 0 && enablePlay,
        completed: false,
        paused: false,
      })),
    );
  }, [enablePlay, itemStory, visible]);

  const currentIndex = useMemo(() => {
    const index = progresses.findIndex(
      progress => progress.started && !progress.completed,
    );
    return index !== -1 ? index : 0;
  }, [progresses]);

  const handleProgressEnd = useCallback(
    (index: number) => {
      setProgresses(prevProgresses =>
        prevProgresses.map((progress, i) => {
          if (index === i) {
            return {...progress, completed: true};
          } else if (index + 1 === i) {
            return {...progress, started: true};
          } else {
            return progress;
          }
        }),
      );
      // startNextProgress(index + 1);
      console.log('index: ', index, ' ---------');
      if (index + 1 < progresses.length) {
      } else {
        // Bắt đầu tiến trình tiếp theo
        onNext(); // Chuyển sang story tiếp theo
      }
    },
    [onNext, progresses.length],
  );
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          position: 'absolute',
          flexDirection: 'row',
          top: 10,
          left: 0,
          right: 0,
          zIndex: 999,
          alignItems: 'center',
        }}>
        {progresses.map((item, index) => (
          <ProgressBar
            pause={item.paused}
            completed={item.completed}
            sizeOfListProgress={progresses.length}
            key={index}
            start={item.started}
            duration={item.duration * 1000}
            color={appColors.white}
            onEnd={() => {
              handleProgressEnd(index);
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
      </SafeAreaView>
      <FastImage
        source={{
          uri: itemStory.dataStories[currentIndex]?.image,
        }} // Hiển thị ảnh của story hiện tại
        style={{
          flex: 1,
          width: AppInfor.width,
          height: AppInfor.height - 100, // Giảm đi 100 để tránh che phủ phần bottom bar
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default memo(StoryDetails);
