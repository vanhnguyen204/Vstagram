import React, {useCallback, useRef, useState} from 'react';
import Container from '../../components/Container';
import Header from './Components/Header.tsx';
import Box from '../../components/Box.tsx';
import MyStory from './Components/MyStory.tsx';
import { navigate, navigateReplace } from "../../utils/NavigationUtils.ts";
import {PageName} from '../../config/PageName.ts';
import TextComponent from '../../components/TextComponent.tsx';
import Slider from '@react-native-community/slider';
import {AppInfor} from '../../constants/AppInfor.ts';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../assets/colors/appColors.ts';
import {Modalize} from 'react-native-modalize';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ModalBottomSheet from '../../components/ModalBottomSheet.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ModalScrollable from '../../components/ModalScrollable.tsx';
import ModalStory from './Components/ModalStory.tsx';
const HomeScreen = () => {
  const navigateToCreatePost = useCallback(() => {
    navigate(PageName.PostEditorScreen);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => {
    setIsVisible(!isVisible);
  };
  const array = Array.from({length: 50}, (_, index) => index + 1);

  return (
    <Container justifyContent={'flex-start'}>
      <Header />
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
      <TouchableOpacity onPress={() => {

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
