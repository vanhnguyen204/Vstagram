import React, {memo} from 'react';
import {FlatList} from 'react-native';
import StoryBarItem from './StoryBarItem.tsx';

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
        return <StoryBarItem />;
      }}
    />
  );
};

export default memo(StoryBar);
