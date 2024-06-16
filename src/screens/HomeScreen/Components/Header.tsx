import React, {memo} from 'react';
import Box from '../../../components/Box.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
interface HeaderHomeScreenProps {
  onLogoPress: () => void;
  onNotificationPress: () => void;
  onChatPress: () => void;
}
const HeaderHomeScreen = (props: HeaderHomeScreenProps) => {
  const {onNotificationPress, onChatPress, onLogoPress} = props;

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
        tintColor={appColors.white}
      />
      <Box flexDirection={'row'}>
        <ButtonComponent name={''} onPress={onNotificationPress}>
          <ImageComponent
            tintColor={appColors.white}
            width={28}
            height={28}
            src={require('../../../assets/icons/bell.png')}
          />
        </ButtonComponent>
        <ButtonComponent marginHorizontal={10} name={''} onPress={onChatPress}>
          <ImageComponent
            tintColor={appColors.white}
            width={28}
            height={28}
            src={require('../../../assets/icons/chat.png')}
          />
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default memo(HeaderHomeScreen);
