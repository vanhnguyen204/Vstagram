import React, {memo, useCallback} from 'react';
import {ImageBackground} from 'react-native';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {usePhotos} from '../../../hooks/Media/usePhotos.ts';

const numColumns = 3;

interface PhotoCardProps {
  item: PhotoIdentifier;
  onSelected: (item: PhotoIdentifier) => void;
  isSelected: boolean;
  index: number;
}

const AlbumImageCard = ({
  item,
  onSelected,
  isSelected,
  index,
}: PhotoCardProps) => {
  const handleSelected = useCallback(() => {
    onSelected(item);
  }, [item, onSelected]);
  return (
    <ButtonComponent onPress={handleSelected}>
      <ImageBackground
        source={{uri: item.node.image.uri}}
        style={{
          width: AppInfor.width / numColumns,
          height: 200,
        }}
        resizeMode={'cover'}>
        <Box
          marginVertical={5}
          marginHorizontal={5}
          backgroundColor={isSelected ? appColors.blue500 : 'transparent'}
          alignSelf={'flex-end'}
          paddingHorizontal={12}
          paddingVertical={5}
          borderWidth={1}
          borderColor={appColors.white}
          radius={99}>
          <TextComponent value={isSelected ? (index + 1).toString() : ''} />
        </Box>
      </ImageBackground>
    </ButtonComponent>
  );
};
const areEqual = (prevProps: PhotoCardProps, nextProps: PhotoCardProps) => {
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.index === nextProps.index
  );
};
export default memo(AlbumImageCard, areEqual);
