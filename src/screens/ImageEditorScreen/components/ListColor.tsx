import React, {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {AppInfor} from '../../../constants/AppInfor';
import {appColors} from '../../../assets/colors/appColors';

import ButtonComponent from '../../../components/ButtonComponent';
import Box from '../../../components/Box';
import {useTextEditor} from './TextEditorLayer';

interface ListColorProps {
  colors: string[][];
}
const ListColor: React.FC<ListColorProps> = ({colors}) => {
  return (
    <FlatList
      keyboardShouldPersistTaps={'always'}
      snapToAlignment={'center'}
      snapToInterval={AppInfor.width}
      decelerationRate={'fast'}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={colors}
      renderItem={({item}) => <ColorItem item={item} />}
    />
  );
};

interface ColorItemProps {
  item: string[];
}
const ColorItem = memo((props: ColorItemProps) => {
  const {item} = props;
  const {textElement, setTextElement} = useTextEditor();
  return (
    <Box
      flexDirection="row"
      justifyContent={'center'}
      style={{width: AppInfor.width}}>
      {item.map((color, index) => (
        <ButtonComponent
          key={index}
          padding={10}
          marginHorizontal={5}
          borderWidth={2}
          borderColor={appColors.white}
          onPress={() => {
            setTextElement({...textElement, color: color});
          }}
          name=""
          backgroundColor={color}
          radius={999}
        />
      ))}
    </Box>
  );
});
const styles = StyleSheet.create({
  carouselContainer: {
    overflow: 'visible',
  },
  listColorStyle: {
    flexDirection: 'row',
  },
});

export default memo(ListColor);
