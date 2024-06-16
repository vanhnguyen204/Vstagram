import React, {useCallback, useRef, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import {navigateAndReset, navigatePush} from '../../utils/NavigationUtils.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {TouchableOpacity, View} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ModalStory from './Components/ModalStory.tsx';
import {ROUTES} from '../../navigators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage.ts';
import {useUserInformation} from '../../hooks';

const HomeScreen = () => {
  const {information} = useUserInformation();
  const navigateToCreatePost = useCallback(() => {
    navigatePush(ROUTES.PostEditorScreen);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  const array = Array.from({length: 50}, (_, index) => index + 1);

  return (
    <Container justifyContent={'flex-start'}>
      <Header
        onChatPress={() => {}}
        onLogoPress={() => {}}
        onNotificationPress={() => {

        }}
      />
      <Box
        alignSelf="stretch"
        flexDirection={'row'}
        justifyContent="flex-start">
        <MyStory onIconAddPress={navigateToCreatePost} onStoryPress={toggle} />
      </Box>

      <TextComponent value="Hello ae" fontFamily="Dancing Script" />
      <TextComponent value="Hello ae" fontFamily="Briem Hand" fontSize={20} />
      <TextComponent value="Hello ae" fontFamily="Bradley Hand" />
      <ButtonComponent name={'Show modal'} onPress={() => toggle()} />
      {/*<ModalBottomSheet isVisible={isVisible} toggle={toggle} transparent={true}>*/}
      {/*  <TextComponent value={'Hello'} />*/}
      {/*</ModalBottomSheet>*/}
      {/*<ModalScrollable isVisible={isVisible} onClose={toggle}>*/}
      {/*  {array.map((item, index) => (*/}
      {/*    <View key={index} style={{margin: 5,padding: 20, backgroundColor: 'green'}}>*/}
      {/*      <TextComponent value={item.toString()} />*/}
      {/*    </View>*/}
      {/*  ))}*/}
      {/*</ModalScrollable>*/}
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.setItem(ACCESS_TOKEN, '').then(r =>
            navigateAndReset([{name: ROUTES.Login}]),
          );
        }}>
        <TextComponent value={'Log out'} />
      </TouchableOpacity>
      <ModalStory
        isVisible={isVisible}
        onClose={toggle}
        dataStory={['1', '2', '3']}
      />
    </Container>
  );
};

export default HomeScreen;
