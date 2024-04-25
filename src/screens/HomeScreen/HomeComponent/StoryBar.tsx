import React, { memo } from "react";
import {FlatList, Text, View} from 'react-native';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {User} from '../../../models/UserModel.ts';
import StoryItem from './StoryItem.tsx';
interface StoryBarProps {
  data: number[];
}
const StoryBar = ({data}: StoryBarProps) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      data={data}
      renderItem={({item, index}) => {
        return <StoryItem />;
      }}
    />
  );
};

export default memo(StoryBar);
