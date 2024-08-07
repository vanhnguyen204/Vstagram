import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {useUserInformation} from '../../../hooks';
interface MyStoryProps {
  item?: object;
  marginHorizontal?: number;
  onStoryPress?: () => void;
  onIconAddPress: () => void;
}
const MyStory = (props: MyStoryProps) => {
  const {item, marginHorizontal, onStoryPress, onIconAddPress} = props;
  const {information} = useUserInformation();
  return (
    <Box alignItems={'center'}>
      <Box style={{overflow: 'visible'}}>
        <LinearGradient
          style={[
            {
              marginHorizontal: marginHorizontal ?? 2,
              //   overflow: 'visible'
            },
            styles.borderStoryGradient,
          ]}
          colors={['#FD1D1D', '#E1306C', '#F77737', '#FCAF45']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity
            onPress={onStoryPress}
            style={[styles.borderStoryChild]}>
            <ImageComponent
              margin={2}
              width={70}
              height={70}
              resizeMode={'cover'}
              borderRadius={99}
              src={
                information.avatar
                  ? {uri: information.avatar}
                  : require('../../../assets/icons/user-avatar.png')
              }
            />
          </TouchableOpacity>
        </LinearGradient>
        <ButtonComponent
          radius={50}
          onPress={onIconAddPress}
          backgroundColor={appColors.blue500}
          borderWidth={2}
          name="Add new story"
          borderColor={appColors.black}
          padding={2}
          style={styles.iconAddStyle}>
          <ImageComponent
            tintColor={appColors.white}
            width={20}
            height={20}
            src={require('../../../assets/icons/plus.png')}
          />
        </ButtonComponent>
      </Box>
      <TextComponent value={'Tin của bạn'} />
    </Box>
  );
};

const styles = StyleSheet.create({
  borderStoryGradient: {
    borderWidth: 1,
    borderRadius: 999,
    padding: 2,
  },
  borderStoryChild: {
    borderWidth: 2,
    borderColor: appColors.backgroundApp,
    borderRadius: 999,
  },
  iconAddStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
export default memo(MyStory);
