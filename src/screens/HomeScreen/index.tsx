import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import Header from './HomeComponent/Header.tsx';
import StoryBar from './HomeComponent/StoryBar.tsx';

const HomeScreen = () => {
  const fakeData: number[] = [1, 2, 3, 4, 5];
  return (
    <Container justifyContent={'flex-start'}>
      <Header />
      <StoryBar data={fakeData} />
    </Container>
  );
};

export default HomeScreen;
