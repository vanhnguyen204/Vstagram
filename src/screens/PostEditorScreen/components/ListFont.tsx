import React from 'react';
import {FlatList, View} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {useStoryStore} from '../../../hooks/useStoryEditor.ts';
interface ListFontProps {
  fonts: string[];
}
const ListFont = (props: ListFontProps) => {
  const {fonts} = props;
  const {setFont} = useStoryStore();
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={fonts}
      renderItem={({item, index}) => (
        <ButtonComponent
          alignItems={'center'}
          justifyContent={'center'}
          marginHorizontal={5}
          name={''}
          backgroundColor={appColors.gray}
          height={10}
          padding={5}
          overflow={'scroll'}
          onPress={() => {
            setFont(item);
          }}>
          <TextComponent fontSize={22} fontFamily={item} value={'Aa'} />
        </ButtonComponent>
      )}
    />
  );
};

export default ListFont;
