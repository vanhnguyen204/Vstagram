import {ActivityIndicator, PermissionsAndroid, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {
  CameraRoll,
  GetPhotosParams,
  PhotoIdentifier,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
export interface GetPhotosReturnType {
  edges: PhotoIdentifier[];
  page_info: {
    has_next_page: boolean;
    end_cursor: string | null;
  };
}

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
  const getMyStories = useCallback(async () => {
    try {
      const response = await getStories();
      setListStory(response);
    } catch (e) {
      console.log('ERROR GET MY STORIES');
      console.log(e);
    }
  }, [setListStory]);
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
  }, [getMusicsAxios, getMyStories, getUserInfor]);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Explanation',
            message: 'This app needs access to your photos.',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const getImages = async (): Promise<PhotoIdentifier[]> => {
    let photos: PhotoIdentifier[] = [];
    let endCursor: string | undefined;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const res: PhotoIdentifiersPage = await CameraRoll.getPhotos({
          first: 50,
          assetType: 'Photos',
          after: endCursor,
        });

        photos = photos.concat(res.edges);
        endCursor = res.page_info.end_cursor;
        hasNextPage = res.page_info.has_next_page;
      } catch (error) {
        console.error('Error getting photos:', error);
        hasNextPage = false;
      }
    }
    return photos;
  };
  const getVideos = async (): Promise<PhotoIdentifier[]> => {
    let videos: PhotoIdentifier[] = [];
    let endCursor: string | undefined;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const res: PhotoIdentifiersPage = await CameraRoll.getPhotos({
          first: 50,
          assetType: 'Videos',
          after: endCursor,
        });
        videos = videos.concat(res.edges);
        endCursor = res.page_info.end_cursor;
        hasNextPage = res.page_info.has_next_page;
      } catch (error) {
        console.error('Error getting videos:', error);
        hasNextPage = false;
      }
    }
    return videos;
  };
  const {setImages, setVideos} = usePhotos();

  useEffect(() => {
    const fetchImages = async () => {
      const permissionGranted = await requestPermissions();
      if (permissionGranted) {
        Promise.all([getVideos(), getImages()])
          .then(res => {
            console.log('Get album success!');
            setVideos(res[0]);
            setImages(res[1]);
          })
          .catch(e => {
            console.log(e);
          });
      }
    };

    fetchImages();
  }, [setImages, setVideos]);

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
