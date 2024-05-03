import {View, Text} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Music} from '../../../models/Music';
import ImageComponent from '../../../components/ImageComponent';
import Box from '../../../components/Box';
import TextComponent from '../../../components/TextComponent';
import {appColors} from '../../../assets/colors/appColors';
import ButtonComponent from '../../../components/ButtonComponent';
import {musicStore} from '../../../hooks/useMusic';
import TrackPlayer from 'react-native-track-player';
import {AppInfor} from '../../../constants/AppInfor';
interface MusicProps {
  item: Music;
  index: number;
}
const MusicItem = (props: MusicProps) => {
  const {item, index} = props;
  const {musicPlaying = '', setMusicPlaying, setUrlMusicPlaying} = musicStore();
  const playMusic = useCallback(async (music: string) => {
    await TrackPlayer.reset();
    setMusicPlaying(item._id);
    setUrlMusicPlaying(item.urlMedia);
    await TrackPlayer.add({
      id: music,
      url: item.urlMedia,
      artwork: item.image,
      title: item.title,
      artist: item.artist,
    });
    await TrackPlayer.play();
  }, []);
  const stopMusic = useCallback(async () => {
    try {
      await TrackPlayer.reset();
      setMusicPlaying('');
    } catch (error) {
      console.error('Error stopping music:', error);
    }
  }, []);

  return (
    <Box
      flexDirection="row"
      marginHorizontal={10}
      width={AppInfor.width}
      marginVertical={5}
      alignSelf="stretch">
      <ImageComponent
        width={50}
        height={50}
        resizeMode="cover"
        style={{borderRadius: 90}}
        src={{uri: item.image}}
      />
      <Box marginHorizontal={10} alignSelf="stretch" flexDirection="row">
        <Box alignItems="flex-start" justifyContent="flex-start">
          <TextComponent
            alignSelf="flex-start"
            value={item.title}
            style={{position: 'absolute', left: 0}}
            fontSize={14}
          />
          <TextComponent
            alignSelf="flex-start"
            value={item.artist}
            style={{position: 'absolute', left: 0}}
            fontSize={12}
            color={appColors.gray}
          />
        </Box>
      </Box>
      <ButtonComponent
        style={{position: 'absolute', right: 0}}
        name="play music"
        onPress={() => {
          if (musicPlaying === item._id) {
            stopMusic();
          } else {
            playMusic(item.urlMedia);
          }
        }}>
        <ImageComponent
          tintColor={appColors.white}
          src={
            musicPlaying === item._id
              ? require('../../../assets/icons/pause.png')
              : require('../../../assets/icons/play.png')
          }
          width={20}
          height={20}
        />
      </ButtonComponent>
    </Box>
  );
};

export default memo(MusicItem);
