import {memo} from 'react';
import Box from './Box.tsx';
import ButtonComponent from './ButtonComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import ImageComponent from './ImageComponent.tsx';

interface MuteButtonProps {
  isMuted?: boolean;
  toggleMute?: () => void;
}

export const MuteButton = memo(
  ({isMuted, toggleMute = () => {}}: MuteButtonProps) => (
    <Box position={'absolute'} bottom={10} right={10} zIndex={99}>
      <ButtonComponent
        backgroundColor={appColors.darkBlur}
        radius={99}
        alignItems={'center'}
        padding={3}
        justifyContent={'center'}
        onPress={toggleMute}>
        <ImageComponent
          alignSelf={'center'}
          tintColor={appColors.white}
          src={
            isMuted
              ? require('../assets/icons/mute.png')
              : require('../assets/icons/volume.png')
          }
        />
      </ButtonComponent>
    </Box>
  ),
);
