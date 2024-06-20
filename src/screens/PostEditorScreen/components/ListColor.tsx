import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {AppInfor} from '../../../constants/AppInfor';
import {appColors} from '../../../assets/colors/appColors';

import ButtonComponent from '../../../components/ButtonComponent';
import Box from '../../../components/Box';
import {useStoryEditor} from '../../../hooks';

interface ListColorProps {
  colors: string[][];
}

const ListColor: React.FC<ListColorProps> = ({colors}) => {
  const {setTextColor} = useStoryEditor();
  return (
    <Carousel
      keyboardShouldPersistTaps={'always'}
      containerCustomStyle={styles.carouselContainer}
      firstItem={1}
      itemWidth={AppInfor.width}
      sliderWidth={AppInfor.width}
      itemHeight={AppInfor.height}
      activeAnimationType={'spring'}
      data={colors}
      renderItem={({item, index}) => (
        <Box key={index} flexDirection="row" alignSelf={'center'}>
          {item.map((item, index) => (
            <ButtonComponent
              key={index}
              padding={10}
              marginHorizontal={5}
              borderWidth={2}
              borderColor={appColors.white}
              onPress={() => {
                setTextColor(item);
              }}
              name=""
              backgroundColor={item}
              radius={999}
            />
          ))}
          {/*<FlatList*/}
          {/*  keyboardDismissMode={'none'}*/}
          {/*  keyboardShouldPersistTaps={'always'}*/}
          {/*  horizontal={true}*/}
          {/*  data={item}*/}
          {/*  keyExtractor={(indexChild: string) => indexChild.toString()}*/}
          {/*  style={[styles.listColorStyle]}*/}
          {/*  renderItem={({item}) => {*/}
          {/*    return (*/}
          {/*     */}
          {/*    );*/}
          {/*  }}*/}
          {/*/>*/}
        </Box>
      )}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    overflow: 'visible',
  },
  listColorStyle: {
    flexDirection: 'row',
  },
});

export default memo(ListColor);
