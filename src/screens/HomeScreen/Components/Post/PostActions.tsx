import React, {useMemo} from 'react';
import Box from '../../../../components/Box.tsx';
import ButtonComponent from '../../../../components/ButtonComponent.tsx';
import ImageComponent from '../../../../components/ImageComponent.tsx';
import {appColors} from '../../../../assets/colors/appColors.ts';

interface PostActionsProps {}
const PostActions = (props: PostActionsProps) => {
  const buttonProps = useMemo(() => {
    return {
      scaleAnimated: true,
      activeOpacity: 1,
    };
  }, []);
  return (
    <Box
      marginVertical={10}
      flex={1}
      justifyContent={'space-between'}
      flexDirection={'row'}
      alignItems={'center'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <ButtonComponent {...buttonProps} onPress={() => {}}>
          <ImageComponent
            tintColor={appColors.white}
            src={require('../../../../assets/icons/heart.png')}
            height={25}
            width={25}
          />
        </ButtonComponent>
        <ButtonComponent
          {...buttonProps}
          marginHorizontal={10}
          onPress={() => {}}>
          <ImageComponent
            tintColor={appColors.white}
            src={require('../../../../assets/icons/chat-2.png')}
            height={25}
            width={25}
          />
        </ButtonComponent>
        <ButtonComponent {...buttonProps} onPress={() => {}}>
          <ImageComponent
            tintColor={appColors.white}
            src={require('../../../../assets/icons/share-2.png')}
            height={25}
            width={25}
          />
        </ButtonComponent>
      </Box>
      <ButtonComponent {...buttonProps} onPress={() => {}}>
        <ImageComponent
          tintColor={appColors.white}
          src={require('../../../../assets/icons/bookmark.png')}
          height={25}
          width={25}
        />
      </ButtonComponent>
    </Box>
  );
};

export default PostActions;
