import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Container from '../../components/Container.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Carousel from 'react-native-reanimated-carousel';
import {mockStories} from '../../models/Mockup.ts';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import ProgressBar from '../../components/ProgressBar.tsx';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {globalStyle} from '../../styles/globalStyle.ts';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          {/*<View style={styles.btnContainer}>*/}
          {/*  <Button title="Submit" onPress={() => null} />*/}
          {/*</View>*/}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
