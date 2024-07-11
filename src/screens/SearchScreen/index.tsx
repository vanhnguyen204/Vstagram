import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform, SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import LongPressButtonWithPopup from './LongPressButton.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TextComponent from '../../components/TextComponent.tsx';
import ListFont from "../ImageEditorScreen/components/ListFont.tsx";
import fonts from "../../assets/fonts";
import Spacer from "../../components/Spacer.tsx";
import Box from "../../components/Box.tsx";
import ImageComponent from "../../components/ImageComponent.tsx";
import InputComponent from "../../components/InputComponent.tsx";
import { AppInfor } from "../../constants/AppInfor.ts";
import SliderComponent from "../../components/SliderComponent.tsx";
import { TextElement } from "../../hooks";
import ListColor from "../ImageEditorScreen/components/ListColor.tsx";
import TextEditorLayer from "../ImageEditorScreen/components/TextEditorLayer.tsx";

const SearchScreen = () => {
  const currentStoryFocus = useRef<number>(0);
  const [currentProgressIndex, setCurrentProgressIndex] = useState<number>(0);

  useEffect(() => {
    setCurrentProgressIndex(0); // Reset currentProgressIndex when currentStoryFocus changes
  }, []);

  return <KeyboardAvoidingComponent />;
};
export function CommentInput() {
  const [value, setValue] = useState('');
  const {width} = Dimensions.get('window');

  const handleChange = (text: string) => {
    setValue(text);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
        maxHeight: 100,
        padding: 5,
        width,
        backgroundColor: appColors.grays.gray500,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: width - 60,
          borderRadius: 25,
          elevation: 2,
        }}>
        <TextInput
          value={value}
          onChangeText={handleChange}
          style={{height: '100%', paddingHorizontal: 10, fontSize: 18}}
          placeholder="Enter message..."
        />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 5,
          bottom: 5,
          justifyContent: 'center',
          alignItems: 'center',
          width: 45,
          height: 45,
          backgroundColor: 'green',
          borderRadius: 24,
          elevation: 2,
        }}
      />
    </View>
  );
}

const KeyboardAvoidingComponent = () => {

  return (
    <SafeAreaView style={styles.container}>
      <TextEditorLayer onDone={ () => {}} />
    </SafeAreaView>
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
