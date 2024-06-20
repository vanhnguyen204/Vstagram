import React, {memo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';

interface StoryBarItemProps {
  item?: object;
  marginHorizontal?: number;
  onStoryPress?: () => void;
}
const StoryBarItem = (props: StoryBarItemProps) => {
  const {item, marginHorizontal, onStoryPress} = props;
  return (
    <LinearGradient
      style={[
        {
          marginHorizontal: marginHorizontal ?? 2,
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
          src={require('../../../assets/icons/user-avatar.png')}
        />
      </TouchableOpacity>
    </LinearGradient>
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
});
export default memo(StoryBarItem);
