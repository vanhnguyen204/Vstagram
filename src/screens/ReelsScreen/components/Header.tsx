import React, { memo } from "react";
import TextComponent from "../../../components/TextComponent.tsx";
import ButtonComponent from "../../../components/ButtonComponent.tsx";
import ImageComponent from "../../../components/ImageComponent.tsx";
import { appColors } from "../../../assets/colors/appColors.ts";
import Box from "../../../components/Box.tsx";
interface HeaderReelProps{
  onCameraOpen: () => void;
}
const Header = (props: HeaderReelProps) => {
  const {onCameraOpen} = props
  return (
    <Box
      padding={10}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      <TextComponent value={'Reels'} fontSize={24} fontWeight={'600'} />
      <ButtonComponent
        activeOpacity={1}
        scaleInValue={0.7}
        scaleAnimated={true}
        radius={99}
        onPress={onCameraOpen}>
        <ImageComponent
          tintColor={appColors.white}
          resizeMode={'contain'}
          src={require('../../../assets/icons/camera.png')}
          height={30}
          width={30}
        />
      </ButtonComponent>
    </Box>
  );
};

export default memo(Header);
