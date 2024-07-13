import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import {ROUTES} from '../../navigators';
import {useStoryStore, useUserInformation} from '../../hooks';
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import ModalStory from './Components/ModalStory.tsx';
import {Story} from '../../models/Story.ts';
import {Post} from '../../models/Post.ts';
import PostCard from './Components/Post/PostCard.tsx';
import {usePostStore} from '../../hooks/usePostStore.ts';
import {getPosts} from '../../services/apis/postServices.ts';
import {playTrack, stopTrack} from '../../../service';
import {useIsFocused} from '@react-navigation/native';
import useAudioControl from '../../hooks/TrackPlayer/useAudioControl.ts';
import {MediaType} from '../../models/Enum.ts';
import ModalSwipeAble from '../../components/ModalSwipeAble.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export interface TestStory {
  id: string;
  stories: Story[];
}
const HomeScreen = () => {
  const {information} = useUserInformation();
  const {toggleMute, isMuted} = useAudioControl();
  const isScreenFocus = useIsFocused();
  const {stories} = useStoryStore();
  const {posts, setPosts} = usePostStore();

  const [viewablePosts, setViewablePosts] = useState<Post[]>([]);
  const navigateToCreatePost = useCallback(() => {
    navigatePush(ROUTES.Album, {
      mediaType: {
        type: MediaType.STORY,
        multipleImage: false,
        title: 'Thêm vào tin',
      },
    });
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const renderPost = useCallback(
    ({item}: {item: Post}) => {
      const isPaused = !viewablePosts.includes(item) || !isScreenFocus;
      return (
        <PostCard
          {...(item.music && {toggleMute, isMuted})}
          item={item}
          pauseVideo={isPaused}
        />
      );
    },
    [isMuted, isScreenFocus, toggleMute, viewablePosts],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const viewableRes: Post[] = viewableItems.map(item => {
        return item.item;
      });
      setViewablePosts(viewableRes);
    },
    [],
  );
  const handleGetPosts = useCallback(() => {
    if (posts.nextPage) {
      getPosts(5, posts.nextPage)
        .then(res => {
          if (res) {
            setPosts(res);
          }
        })
        .catch(e => {
          console.log('Error get post: ', e);
        });
    }
  }, [posts.nextPage, setPosts]);
  useEffect(() => {
    handleGetPosts();
  }, [handleGetPosts]);

  const filterPostHasMusic = useCallback((data: Post[]) => {
    return data.filter(
      item => item.postType.type === 'PHOTO' && item?.music !== '',
    );
  }, []);
  useEffect(() => {
    const playMusicForVisiblePosts = async () => {
      const filteredMusicPosts = filterPostHasMusic(viewablePosts);

      if (filteredMusicPosts.length === 0) {
        await stopTrack();
        return;
      }

      const firstMusicPost = filteredMusicPosts[0];
      if (viewablePosts.includes(firstMusicPost) && isScreenFocus) {
        try {
          await playTrack(firstMusicPost.music, true);
          console.log('Music is playing');
        } catch (e) {
          console.error('Error playing music: ', e);
        }
      }
    };
    playMusicForVisiblePosts();
    return () => {
      stopTrack();
    };
  }, [filterPostHasMusic, isScreenFocus, viewablePosts]);
  const navigateToChatStore = useCallback(() => {
    navigatePush(ROUTES.ChatStore);
  }, []);
  return (
    <GestureHandlerRootView>
      <Container justifyContent={'flex-start'}>
        <Header
          onChatPress={navigateToChatStore}
          onLogoPress={() => {}}
          onNotificationPress={() => {}}
        />
        <ModalStory isVisible={isVisible} onClose={toggle} stories={stories} />
        {/*<ModalSwipeAble*/}
        {/*  visible={isVisible}*/}
        {/*  onClose={toggle}*/}
        {/*  containerStyle={{}}>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      flex: 1,*/}
        {/*      backgroundColor: 'purple',*/}
        {/*      alignItems: 'center',*/}
        {/*      justifyContent: 'center',*/}
        {/*    }}>*/}
        {/*    <TextComponent value={'hello'} />*/}
        {/*  </View>*/}
        {/*</ModalSwipeAble>*/}
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
          data={posts.data}
          renderItem={renderPost}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 80,
          }}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            console.log(distanceFromEnd);
            if (distanceFromEnd <= 0) {
              return;
            }
            handleGetPosts();
          }}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </Container>
    </GestureHandlerRootView>
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
