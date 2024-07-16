import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import Video from 'react-native-video';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';

import {globalStyle} from '../../styles/globalStyle.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import Spacer from '../../components/Spacer.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Box from '../../components/Box.tsx';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';

type ReelEditorScreenRouteProp = RouteProp<RootStackParams, 'ReelEditorScreen'>;
type ReelEditorScreenNavigationProp = NavigationProp<
  RootStackParams,
  'ReelEditorScreen'
>;
type Props = {
  route: ReelEditorScreenRouteProp;
  navigation: ReelEditorScreenNavigationProp;
};
const ReelEditorScreen = (props: Props) => {
  const {video} = props.route.params;
  const isScreenFocus = useIsFocused();
  const [pauseVideo, setPauseVideo] = useState(false);
  const [comment, setComment] = useState<string>('');
  useFocusEffect(
    useCallback(() => {
      if (isScreenFocus) {
        setPauseVideo(false);
      } else {
        setPauseVideo(true);
      }
    }, [isScreenFocus]),
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyle.containerStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header
            style={globalStyle.headerStyle}
            componentLeft={
              <ButtonComponent onPress={goBackNavigation}>
                <ImageComponent
                  tintColor={appColors.white}
                  src={require('../../assets/icons/left.png')}
                  width={30}
                  height={30}
                />
              </ButtonComponent>
            }
            componentCenter={
              <TextComponent fontSize={16} value={'Thước phim mới'} />
            }
            componentRight={<Spacer width={30} height={30} />}
          />
          <InputComponent
            multiline={true}
            numberOfLines={2}
            value={comment}
            placeholder={'Viết chú thích'}
            onChangeText={setComment}
            placeholderTextColor={appColors.placeholderTextColor}
          />
          <Video
            source={{uri: video.uri}}
            style={{flex: 1}}
            resizeMode={'contain'}
            paused={pauseVideo}
            controls={true}
            repeat={true}
            rate={1}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReelEditorScreen;
