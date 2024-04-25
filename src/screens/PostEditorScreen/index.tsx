import React, {useCallback} from 'react';
import Container from '../../components/Container.tsx';
import {Text} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';
import {AppInfor} from '../../constants/AppInfor.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';

const PostEditorScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const chooseMedia = useCallback(() => {
    launchImageLibrary({
      mediaType: 'mixed',
      maxHeight: AppInfor.height / 2,
    })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  React.useEffect(() => {
    return navigation.addListener('focus', () => {
      chooseMedia();
    });
  }, [chooseMedia, navigation]);
  return (
    <Container justifyContent={'flex-start'}>
      <Box
        alignSelf={'stretch'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <ButtonComponent name={'Close'} onPress={() => {}}>
          <ImageComponent
            tinColor={appColors.white}
            src={require('../../assets/icons/close.png')}
            width={30}
            height={30}
          />
        </ButtonComponent>
        <ButtonComponent name={'Tiếp tục'} onPress={() => {}} />
      </Box>
    </Container>
  );
};

export default PostEditorScreen;
