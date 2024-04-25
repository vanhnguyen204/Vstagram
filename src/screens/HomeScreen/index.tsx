import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import Header from './HomeComponent/Header.tsx';
import StoryBar from './HomeComponent/StoryBar.tsx';
import StoryItem from './HomeComponent/StoryItem.tsx';
import Box from "../../components/Box.tsx";

const HomeScreen = () => {
  const fakeData: number[] = [1, 2, 3, 4, 5];
  return (
    <Container justifyContent={'flex-start'}>
      <Header />
      <Box flexDirection={'row'}>
        <StoryItem />
        <StoryBar data={fakeData} />
      </Box>
    </Container>
  );
};

export default HomeScreen;
