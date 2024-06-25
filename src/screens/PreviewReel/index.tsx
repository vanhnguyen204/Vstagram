import React from 'react';
import Container from '../../components/Container.tsx';
import Video from 'react-native-video';
import {RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type PreviewReelsProps = RouteProp<RootStackParams, 'PreviewReel'>;
type PreviewReelsNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'PreviewReel'
>;

type Props = {
  route: PreviewReelsProps;
  navigation: PreviewReelsNavigationProp;
};
const PreviewReel = (props: Props) => {
  const {videoUrl} = props.route.params;
  return (
    <Container>
      <Video repeat={true} source={{uri: videoUrl}} resizeMode={'contain'}/>
    </Container>
  );
};

export default PreviewReel;
