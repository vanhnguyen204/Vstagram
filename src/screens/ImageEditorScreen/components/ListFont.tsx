import React, {forwardRef, memo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import {useTextEditor} from './TextEditorLayer.tsx';

interface ListFontProps {
  fonts: string[];
}
const ListFont = forwardRef(
  (props: ListFontProps, ref: React.ForwardedRef<any>) => {
    const {fonts} = props;

    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'always'}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={fonts}
        renderItem={({item}) => <FontItem item={item} />}
      />
    );
  },
);
interface FontItemProps {
  item: string;
}

const FontItem = memo((props: FontItemProps) => {
  const {item} = props;
  const {textElement, setTextElement} = useTextEditor();
  return (
    <ButtonComponent
      alignItems={'center'}
      justifyContent={'center'}
      marginHorizontal={5}
      name={''}
      radius={99}
      backgroundColor={appColors.grays.gray500}
      height={10}
      padding={3}
      overflow={'scroll'}
      onPress={() => {
        setTextElement({...textElement, font: item});
      }}>
      <Box style={styles.fontContainer}>
        <TextComponent fontSize={22} fontFamily={item} value={'Aa'} />
      </Box>
    </ButtonComponent>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fontContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default memo(ListFont);
