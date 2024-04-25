import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Container from '../../components/Container.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {navigatePush} from '../../utils/NavigationUtils.ts';
import {PageName} from '../../config/PageName.ts';

const CreatePostScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      navigatePush(PageName.PostEditorScreen);
    });
  }, [navigation]);
  return <View />;
};

export default CreatePostScreen;
