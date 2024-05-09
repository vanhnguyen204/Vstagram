import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyle} from '../../styles/globalStyle';
import {appColors} from '../../assets/colors/appColors';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import ImageComponent from '../../components/ImageComponent';
import Box from '../../components/Box';
import {NavigationProp} from '@react-navigation/native';
import {PageName} from '../../config/PageName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage';
import {navigateReplace} from '../../utils/NavigationUtils';
import {getListMusic} from '../../services/apis/musicServices.ts';
import {musicStore} from '../../hooks/useMusic';
interface WelcomeScreenProps {
  navigation: NavigationProp<any>; // Thay any bằng kiểu dữ liệu cụ thể của màn hình tiếp theo
}
const WelcomeScreen = (props: WelcomeScreenProps) => {
  const {setListMusic} = musicStore();
  useEffect(() => {
    const value = AsyncStorage.getItem(ACCESS_TOKEN);
    getListMusic()
      .then(response => {
        // @ts-ignore
        setListMusic(response);
        if (value !== null) {
          navigateReplace(PageName.BottomTab);
        } else {
          navigateReplace(PageName.Login);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <Container justifyContent="space-around">
      <ImageComponent
        src={require('../../assets/icons/icon-app.png')}
        width={100}
        height={100}
      />
      <ActivityIndicator color={appColors.white} size={'small'} />
      <Box flex={0} alignItems="center">
        <TextComponent color={appColors.white} value="from" />
        <TextComponent color={appColors.white} fontSize={20} value="Vanh" />
      </Box>
    </Container>
  );
};

export default WelcomeScreen;
