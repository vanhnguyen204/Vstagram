import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {ROUTES} from '../../navigators';
import {useStoryStore, useUserInformation} from '../../hooks';
import ModalScrollable from '../../components/ModalScrollable.tsx';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import ModalStory from './Components/ModalStory.tsx';
import {Story} from '../../models/Story.ts';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
export interface TestStory {
  id: string;
  stories: Story[];
}
const HomeScreen = () => {
  const {information} = useUserInformation();
  const {stories} = useStoryStore();
  const {photos} = usePhotos();
  const navigateToCreatePost = useCallback(() => {
    navigatePush(ROUTES.PostEditorScreen);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <Container justifyContent={'flex-start'}>
      <Header
        onChatPress={() => {}}
        onLogoPress={() => {}}
        onNotificationPress={() => {}}
      />
      <ModalStory isVisible={isVisible} onClose={toggle} stories={stories} />
      <Box
        alignSelf="stretch"
        flexDirection={'row'}
        justifyContent="flex-start">
        <MyStory onIconAddPress={navigateToCreatePost} onStoryPress={toggle} />
      </Box>

      <TextComponent value="Hello ae" fontFamily="Dancing Script" />
      <TextComponent value="Hello ae" fontFamily="Briem Hand" fontSize={20} />
      <TextComponent value="Hello ae" fontFamily="Bradley Hand" />
      <TextComponent value={photos.length.toString()} />

      <ButtonComponent name={'Show modal'} onPress={() => toggle()} />
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
