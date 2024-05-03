import React, {memo} from 'react';
import {FlatList, Keyboard, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {AppInfor} from '../../../constants/AppInfor';
import {appColors} from '../../../assets/colors/appColors';

import ButtonComponent from '../../../components/ButtonComponent';
import Box from '../../../components/Box';
import {useStoryStore} from '../../../hooks/useStoryEditor';

interface ListColorProps {
  colors: string[][];
}

const ListColor: React.FC<ListColorProps> = ({colors}) => {
  const {setTextColor} = useStoryStore();
  return (
    <Carousel
      containerCustomStyle={styles.carouselContainer}
      firstItem={1}
      itemWidth={AppInfor.width}
      sliderWidth={AppInfor.width}
      itemHeight={AppInfor.height}
      activeAnimationType={'spring'}
      data={colors}
      renderItem={({item, index}) => (
        <Box key={index} flexDirection="column">
          <FlatList
            keyboardShouldPersistTaps={'never'}
            horizontal={true}
            data={item}
            keyExtractor={(indexChild: string) => indexChild.toString()}
            style={[styles.listColorStyle]}
            renderItem={({item}) => {
              return (
                <ButtonComponent
                  marginHorizontal={5}
                  borderWidth={2}
                  borderColor={appColors.white}
                  onPress={() => {
                    Keyboard.dismiss();
                    setTextColor(item);
                  }}
                  name=""
                  backgroundColor={item}
                  radius={999}
                />
              );
            }}
          />
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
