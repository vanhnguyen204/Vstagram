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

import {getStories, getUserInformation} from '../../services/apis';
import {ROUTES} from '../../navigators';
import {musicStore, useStoryStore, useUserInformation} from '../../hooks';
import {User} from '../../models/User.ts';
import {getMusics} from '../../services/apis/musicServices.ts';

const WelcomeScreen = () => {
  const {setMusics} = musicStore();
  const {setListStory} = useStoryStore();
  const {setInformation} = useUserInformation();
  const getUserInfor = useCallback(async () => {
    try {
      const user: User = await getUserInformation();
      setInformation(user);
    } catch (e) {
      console.log(e);
    }
  }, [setInformation]);
  const getMyStories = async () => {
    try {
      const response = await getStories();
      setListStory(response);
    } catch (e) {
      console.log('ERROR GET MY STORIES');
      console.log(e);
    }
  };
  const getMusicsAxios = useCallback(async () => {
    try {
      const musics = await getMusics(10, 1);
      setMusics(musics);
    } catch (e) {
      console.log(e);
    }
  }, [setMusics]);
  useEffect(() => {
    AsyncStorage.getItem(ACCESS_TOKEN)
      .then(res => {
        if (res) {
          navigateReplace(ROUTES.BottomTab);
          Promise.allSettled([getMusicsAxios(), getMyStories(), getUserInfor()])
            .then(() => {})
            .catch(e => {
              console.log(e);
            });
        } else {
          navigateReplace(ROUTES.Login);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [getMusicsAxios, getUserInfor]);

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
