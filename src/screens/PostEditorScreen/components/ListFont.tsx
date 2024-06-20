import React from 'react';
import {FlatList} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {useStoryEditor} from '../../../hooks/useStoryEditor.ts';

interface ListFontProps {
  fonts: string[];
}
const ListFont = (props: ListFontProps) => {
  const {fonts} = props;
  const {setFont} = useStoryEditor();
  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'}>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{alignSelf: 'stretch'}}
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={fonts}
        renderItem={({item, index}) => (
          <ButtonComponent
            alignItems={'center'}
            justifyContent={'center'}
            marginHorizontal={5}
            name={''}
            radius={99}
            backgroundColor={appColors.grays.gray500}
            height={10}
            padding={5}
            overflow={'scroll'}
            onPress={() => {
              setFont(item);
            }}>
            <Box
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent fontSize={22} fontFamily={item} value={'Aa'} />
            </Box>
          </ButtonComponent>
        )}
      />
    </Box>
  );
};

export default ListFont;
