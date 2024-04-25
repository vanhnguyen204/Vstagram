import React, { memo } from "react";
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';

const Header = () => {
  return (
    <Box
      style={{width: AppInfor.width}}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}>
      <ImageComponent
        width={150}
        height={50}
        resizeMode={'contain'}
        src={AppInfor.textApp}
        tinColor={appColors.white}
      />
      <Box flexDirection={'row'}>
        <ButtonComponent name={''} onPress={() => {}}>
          <ImageComponent
            tinColor={appColors.white}
            width={28}
            height={28}
            src={require('../../../assets/icons/bell.png')}
          />
        </ButtonComponent>
        <ButtonComponent name={''} onPress={() => {}}>
          <ImageComponent
            tinColor={appColors.white}
            width={28}
            height={28}
            src={require('../../../assets/icons/chat.png')}
          />
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default memo(Header);
