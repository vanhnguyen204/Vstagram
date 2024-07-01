import React, {memo, useCallback} from 'react';
import {Music} from '../../../models';
import ImageComponent from '../../../components/ImageComponent';
import Box from '../../../components/Box';
import TextComponent from '../../../components/TextComponent';
import {appColors} from '../../../assets/colors/appColors';
import ButtonComponent from '../../../components/ButtonComponent';
import {musicStore} from '../../../hooks';
import TrackPlayer from 'react-native-track-player';
import {AppInfor} from '../../../constants/AppInfor';
import {useStoryEditor} from '../../../hooks';

interface MusicProps {
  item: Music;
  index: number;
  onPlay: (music: Music) => void;
  onStop: () => void;
  onMusicSelected: (music: Music) => void;
  isPlaying: boolean;
}
const MusicItem = (props: MusicProps) => {
  const {item, isPlaying, index, onMusicSelected, onPlay, onStop} = props;
  const playMusic = useCallback(() => {
    onPlay(item);
  }, [item, onPlay]);

  const handleTogglePlayback = useCallback(() => {
    if (isPlaying) {
      onStop();
    } else {
      playMusic();
    }
  }, [isPlaying, onStop, playMusic]);
  console.log('render item: ', index);
  return (
    <Box
      flexDirection="row"
      marginHorizontal={10}
      width={AppInfor.width}
      marginVertical={5}
      justifyContent={'space-between'}
      alignItems={'center'}
      alignSelf="stretch">
      <Box flexDirection={'row'}>
        <ImageComponent
          width={50}
          height={50}
          resizeMode="cover"
          borderRadius={90}
          src={{uri: item.image}}
        />
        <Box marginHorizontal={10}>
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
      </Box>
      <ButtonComponent name="play music" onPress={handleTogglePlayback}>
        <ImageComponent
          tintColor={appColors.white}
          src={
            isPlaying
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

const areEqual = (prevProps: MusicProps, nextProps: MusicProps) => {
  return (
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.item._id === nextProps.item._id
  );
};
export default memo(MusicItem, areEqual);
