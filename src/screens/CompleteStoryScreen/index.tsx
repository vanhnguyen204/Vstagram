import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import ImageComponent from '../../components/ImageComponent';
import {AppInfor} from '../../constants/AppInfor';
import Container from '../../components/Container';

const CompleteStoryScreen = ({route}) => {
  const {uriCapture, uriOriginal} = route.params;

  return (
    <Container>
      <ImageBackground
        style={[styles.imageBackgroundContainer]}
        blurRadius={20}
        source={{uri: uriOriginal}}
        resizeMode={'cover'}>
        <ImageComponent
          src={{uri: uriCapture}}
          width={AppInfor.width}
          height={undefined}
          flex={1}
          resizeMode="contain"
        />
      </ImageBackground>
    </Container>
  );
};
const styles = StyleSheet.create({
  imageBackgroundContainer: {
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
export default CompleteStoryScreen;
