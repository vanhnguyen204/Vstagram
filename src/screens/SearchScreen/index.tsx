import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Container from '../../components/Container.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Carousel from 'react-native-reanimated-carousel';
import {mockStories} from '../../models/Mockup.ts';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import ProgressBar from '../../components/ProgressBar.tsx';

const SearchScreen = () => {
  const currentStoryFocus = useRef<number>(0);
  const [currentProgressIndex, setCurrentProgressIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentProgressIndex(0); // Reset currentProgressIndex when currentStoryFocus changes
  }, []);

  return (
    <Container backgroundColor={appColors.grays.gray400}>
      <TextComponent value={'Test'} />
      <Carousel
        vertical={false}
        loop={false}
        width={400}
        maxScrollDistancePerSwipe={200}
        height={300}
        onSnapToItem={index => {
          currentStoryFocus.current = index;
          setCurrentProgressIndex(0); // Reset currentProgressIndex when carousel snaps to a new item
        }}
        data={mockStories}
        renderItem={({item, index}) => (
          <Box
            backgroundColor={
              index === 0 ? appColors.blue500 : appColors.backgroundApp
            }
            margin={20}>
            <Box flexDirection={'row'} position={'relative'} top={10}>
              {item.dataStories.map((dataStory, i) => (
                <ProgressBar
                  key={dataStory._id}
                  duration={dataStory.duration}
                  color={appColors.white}
                  onEnd={() => {
                    // Khi progress hoàn thành, chuyển sang progress của item tiếp theo (nếu có)
                    if (
                      i === currentProgressIndex &&
                      currentProgressIndex < item.dataStories.length - 1
                    ) {
                      setCurrentProgressIndex(prevIndex => prevIndex + 1);
                    }
                  }}
                  start={
                    index === currentStoryFocus.current &&
                    i === currentProgressIndex
                  }
                  completed={false}
                  pause={false}
                  sizeOfListProgress={item.dataStories.length}
                />
              ))}
            </Box>
            <View style={{height: 200, width: 200}} />
          </Box>
        )}
      />
    </Container>
  );
};

export default SearchScreen;
