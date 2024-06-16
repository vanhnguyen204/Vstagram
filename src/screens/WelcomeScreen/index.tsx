import {ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {appColors} from '../../assets/colors/appColors';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import ImageComponent from '../../components/ImageComponent';
import Box from '../../components/Box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN} from '../../constants/AsyncStorage';
import {navigateReplace} from '../../utils/NavigationUtils';
import {musicStore} from '../../hooks/useMusic';
import {getUserInformation} from '../../services/apis';
import {ROUTES} from '../../navigators';
import {useUserInformation} from '../../hooks';
import {User} from '../../models/User.ts';
import {getMusics} from '../../services/apis/musicServices.ts';

const WelcomeScreen = () => {
  const {setListMusic} = musicStore();
  const {setInformation} = useUserInformation();
  const getUserInfor = useCallback(async () => {
    try {
      const user: User = await getUserInformation();
      setInformation(user);
    } catch (e) {
      console.log(e);
    }
  }, [setInformation]);
  const getMusicsAxios = async () => {
    try {
      const musics = await getMusics();
      setListMusic(musics.data);
      console.log(musics);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    Promise.allSettled([getMusicsAxios()]);
    AsyncStorage.getItem(ACCESS_TOKEN)
      .then(res => {
        if (res) {
          navigateReplace(ROUTES.BottomTab);
          getUserInfor();
        } else {
          navigateReplace(ROUTES.Login);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [getUserInfor, setListMusic]);

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
