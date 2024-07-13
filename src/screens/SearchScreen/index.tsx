import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import LongPressButtonWithPopup from './LongPressButton.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TextComponent from '../../components/TextComponent.tsx';
import ListFont from '../ImageEditorScreen/components/ListFont.tsx';
import fonts from '../../assets/fonts';
import Spacer from '../../components/Spacer.tsx';
import Box from '../../components/Box.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import SliderComponent from '../../components/SliderComponent.tsx';
import {TextElement} from '../../hooks';
import ListColor from '../ImageEditorScreen/components/ListColor.tsx';
import TextEditorLayer from '../ImageEditorScreen/components/TextEditorLayer.tsx';
import Container from '../../components/Container.tsx';

const SearchScreen = () => {
  return (
    <Container>
      <TextComponent value={'hello'} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.grays.gray500,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
export default SearchScreen;
