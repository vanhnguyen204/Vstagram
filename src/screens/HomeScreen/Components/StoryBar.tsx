import React, { memo } from "react";
import {FlatList, Text, View} from 'react-native';
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
