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
      <TouchableOpacity
        onPress={async () => {
          await TrackPlayer.play();
        }}>
        <Text style={{color: appColors.white}}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await TrackPlayer.reset();
          await TrackPlayer.pause();
        }}>
        <Text style={{color: appColors.white}}>pause</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default HomeScreen;
