import React, {useCallback, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import {navigateAndReset, navigatePush} from '../../utils/NavigationUtils.ts';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {ROUTES} from '../../navigators';
import {useUserInformation} from '../../hooks';
import ScrollableModal from '../../components/ScrollableModal.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage.ts';

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
  const [dataTest, setDataTest] = useState(array);
  const array2 = Array.from({length: 50}, (_, index) => index + 1);
  return (
    <Container justifyContent={'flex-start'}>
      <Header
        onChatPress={() => {}}
        onLogoPress={() => {}}
        onNotificationPress={() => {}}
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
      <ScrollableModal<number>
        onEndReached={distance => {
          console.log(distance);
          if (distance > 150) {
            setDataTest(prevState => [...prevState, ...array2]);
          }
        }}
        data={dataTest}
        renderItem={({item}) => (
          <Box backgroundColor={appColors.grays.gray600} marginVertical={10}>
            <TextComponent value={item.toString()} />
          </Box>
        )}
        keyExtractor={(item, index) => index.toString()}
        visible={isVisible}
        onClose={toggle}
      />
      <ButtonComponent
        name={'Log out'}
        onPress={() => {
          AsyncStorage.setItem(ACCESS_TOKEN, '')
            .then(res => {
              navigateAndReset([{name: ROUTES.Login}]);
            })
            .catch(e => {
              console.log(e);
            });
        }}
      />
      {/*<ModalStory*/}
      {/*  isVisible={isVisible}*/}
      {/*  onClose={toggle}*/}
      {/*  dataStory={['1', '2', '3']}*/}
      {/*/>*/}
    </Container>
  );
};

export default HomeScreen;
