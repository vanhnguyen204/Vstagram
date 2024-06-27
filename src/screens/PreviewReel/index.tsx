import React from 'react';
import Container from '../../components/Container.tsx';
import Video from 'react-native-video';
import {RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type PreviewReelProp = RouteProp<RootStackParams, 'PreviewReel'>;
type PreviewReelNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'PreviewReel'
>;

type Props = {
  route: PreviewReelProp;
  navigation: PreviewReelNavigationProp;
};
const PreviewReel = (props: Props) => {
  const {video} = props.route.params;
  console.log(video);
  return (
    <Container>
      <Video

        style={{flex: 1}}
        repeat={true}
        source={{uri: video.path}}
        resizeMode={'contain'}
      />
    </Container>
  );
};

export default PreviewReel;
