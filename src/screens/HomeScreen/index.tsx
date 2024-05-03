import {Text, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../../components/Container';
import Header from './HomeComponent/Header.tsx';
import StoryBar from './HomeComponent/StoryBar.tsx';
import StoryItem from './HomeComponent/StoryItem.tsx';
import Box from '../../components/Box.tsx';
import TrackPlayer from 'react-native-track-player';
import {appColors} from '../../assets/colors/appColors.ts';
import VideoPlayer from 'react-native-video-player';
import MyStory from './HomeComponent/MyStory.tsx';
import {navigate} from '../../utils/NavigationUtils.ts';
import {PageName} from '../../config/PageName.ts';
import TextComponent from '../../components/TextComponent.tsx';
const HomeScreen = () => {
  const navigateToCreatePost = useCallback(() => {
    navigate(PageName.PostEditorScreen);
  }, []);
  return (
    <Container justifyContent={'flex-start'}>
      <Header />
      <Box
        alignSelf="stretch"
        flexDirection={'row'}
        justifyContent="flex-start">
        <MyStory onIconAddPress={navigateToCreatePost} />
      </Box>

      <TextComponent value="Hello ae" fontFamily="Dancing Script" />
      <TextComponent value="Hello ae" fontFamily="Briem Hand" />
      <TextComponent value="Hello ae" fontFamily="Dancing Script" />
    </Container>
  );
};

export default HomeScreen;
