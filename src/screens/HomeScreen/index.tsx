import React, {useCallback, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import {ROUTES} from '../../navigators';
import {useStoryStore, useUserInformation} from '../../hooks';
import {FlatList, StyleSheet, ViewToken} from 'react-native';
import ModalStory from './Components/ModalStory.tsx';
import {Story} from '../../models/Story.ts';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
import {Post} from '../../models/Post.ts';
import PostCard from './Components/Post/PostCard.tsx';
import {mockPost} from '../../models/Mockup.ts';
import {usePostStore} from '../../hooks/usePostStore.ts';

export interface TestStory {
  id: string;
  stories: Story[];
}
const HomeScreen = () => {
  const {information} = useUserInformation();
  const {stories} = useStoryStore();
  const {posts} = usePostStore();
  const [viewableVideoPosts, setViewableVideoPosts] = useState<string[]>([]);
  const navigateToCreatePost = useCallback(() => {
    navigatePush(ROUTES.PostEditorScreen);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const renderPost = useCallback(
    ({item}: {item: Post}) => {
      const isPaused = !viewableVideoPosts.includes(item._id);
      return <PostCard item={item} paused={isPaused} />;
    },
    [viewableVideoPosts],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log('Viewable: ', viewableItems);
      const viewableIds = viewableItems.map(item => item.item._id);
      setViewableVideoPosts(viewableIds);
    },
    [],
  );
  return (
    <Container justifyContent={'flex-start'}>
      <Header
        onChatPress={() => {}}
        onLogoPress={() => {}}
        onNotificationPress={() => {}}
      />
      <ModalStory isVisible={isVisible} onClose={toggle} stories={stories} />
      <FlatList
        ListHeaderComponent={
          <Box
            alignSelf="stretch"
            flexDirection={'row'}
            justifyContent="flex-start">
            <MyStory
              onIconAddPress={navigateToCreatePost}
              onStoryPress={toggle}
            />
          </Box>
        }
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={renderPost}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  progressItem: {
    marginVertical: 10,
  },
  progressText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
