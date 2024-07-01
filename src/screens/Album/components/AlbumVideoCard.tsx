import React, {memo, useCallback} from 'react';
import Box from '../../../components/Box.tsx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {ImageBackground, View} from 'react-native';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';

interface AlbumVideoCardProps {
  item: PhotoIdentifier;
  onSelected: (item: PhotoIdentifier) => void;
  isSelected: boolean;
  index: number;
}
const numColumns = 3;
const AlbumVideoCard = (props: AlbumVideoCardProps) => {
  const {item, onSelected, isSelected, index} = props;
  const handleVideoSelected = useCallback(() => {
    onSelected(item);
  }, [item, onSelected]);
  console.log('render video: ', index);
  return (
    <ButtonComponent onPress={handleVideoSelected}>
      <ImageBackground
        source={{uri: item.node.image.uri}}
        style={{
          width: AppInfor.width / numColumns,
          height: 200,
          justifyContent: 'space-between',
        }}
        resizeMode={'cover'}>
        <Box
          marginVertical={5}
          marginHorizontal={5}
          backgroundColor={isSelected ? appColors.blue500 : 'transparent'}
          alignSelf={'flex-end'}
          padding={7}
          borderWidth={1}
          borderColor={appColors.white}
          radius={99}>
          <View />
        </Box>
        <TextComponent
          value={item.node.image.playableDuration.toFixed(2).toString()}
        />
      </ImageBackground>
    </ButtonComponent>
  );
};
const areEqual = (
  prevProps: AlbumVideoCardProps,
  nextProps: AlbumVideoCardProps,
) => {
  return (
    prevProps.item.node.id === nextProps.item.node.id &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.index === nextProps.index
  );
};
export default memo(AlbumVideoCard, areEqual);
