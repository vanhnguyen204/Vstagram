import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {FlatList, View, ViewToken} from 'react-native';
import ModalSwipeAble from '../../../components/ModalSwipeAble.tsx';
import StoryDetails from './StoryDetails.tsx';
import {mockStories} from '../../../models/Mockup.ts';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import {Story} from '../../../models/Story.ts';

interface ModalStoryProps {
  isVisible: boolean;
  onClose: () => void;
  stories: Story[];
}

const ModalStory: React.FC<ModalStoryProps> = ({isVisible, onClose}) => {
  const listStoryRef = useRef<FlatList>(null);
  const [storyViewable, setStoryViewable] = useState<ViewToken[]>([]);
  const onNextPage = useCallback(() => {
    if (storyViewable.length !== 0) {
      const currentIndex = storyViewable[0].index ?? 0;
      if (listStoryRef.current && currentIndex + 1 < mockStories.length) {
        listStoryRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      } else {
        onClose();
      }
      console.log('currentIndex: ', currentIndex);
    }
  }, [onClose, storyViewable]);

  const onPrevPage = useCallback(() => {
    if (listStoryRef.current) {
      // @ts-ignore
      const currentIndex = listStoryRef.current.index;
      if (currentIndex !== undefined && currentIndex > 0) {
        listStoryRef.current.scrollToIndex({index: currentIndex - 1});
      }
    }
  }, []);

  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: ViewToken[];
      changed: ViewToken[];
    }) => {
      if (viewableItems.length > 0) {
        setStoryViewable(viewableItems);
      }
      console.log('Viewable: ', viewableItems);
      console.log('Viewable changed: ', changed);
    },
    [],
  );
  const enablePlayStory = useMemo(() => {
    return storyViewable[0]?.item.userId;
  }, [storyViewable]);
  // console.log('Active play: ', enablePlayStory);
  return (
    <ModalSwipeAble
      visible={isVisible}
      onClose={onClose}
      containerStyle={{backgroundColor: appColors.backgroundApp}}>
      <FlatList
        ref={listStoryRef}
        showsHorizontalScrollIndicator={false}
        snapToInterval={AppInfor.width}
        decelerationRate={'fast'}
        snapToAlignment={'center'}
        horizontal={true}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        data={mockStories}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({item, index}) => (
          <StoryDetails
            enablePlay={enablePlayStory === item.userId}
            visible={isVisible}
            onClose={onClose}
            onNext={onNextPage}
            onPrev={onPrevPage}
            itemStory={item}
          />
        )}
      />
    </ModalSwipeAble>
  );
};

export default memo(ModalStory);
