import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevice,
  VideoFile,
  CameraCaptureError,
} from 'react-native-vision-camera';
import {Svg, Circle} from 'react-native-svg';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {useFocusEffect} from '@react-navigation/native';
import TextComponent from "../../components/TextComponent.tsx";


const SettingScreen = () => {


  return (
    <View style={styles.container}>
     <TextComponent value={'Setting'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.black900,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    color: appColors.white,
    fontSize: 24,
    marginTop: 10,
  },
});

export default SettingScreen;
