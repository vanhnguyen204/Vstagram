import React, { memo } from "react";
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
interface StoryItemProps {
  item?: object;
  marginHorizontal?: number;
}
const StoryItem = (props: StoryItemProps) => {
  const {item, marginHorizontal} = props;
  return (
    <LinearGradient
      style={{
        borderWidth: 1, // Đặt độ dày cho border
        borderRadius: 999,
        padding: 2,
        marginHorizontal: marginHorizontal ?? 2,
      }}
      colors={['#FD1D1D', '#E1306C', '#F77737', '#FCAF45']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View
        style={{
          borderWidth: 2,
          borderColor: appColors.backgroundApp,
          borderRadius: 999,
        }}>
        <ImageComponent
          margin={2}
          width={50}
          height={50}
          src={require('../../../assets/icons/user-avatar.png')}
        />
      </View>
    </LinearGradient>
  );
};

export default memo(StoryItem);
