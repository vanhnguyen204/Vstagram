import React, {useCallback} from 'react';
import {ImageType} from '../../../hooks/Media/usePhotos.ts';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import FastImage from 'react-native-fast-image';
import CloseSvg from '../../../assets/svg/public/CloseSvg.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import Box from '../../../components/Box.tsx';
interface ImageCardProps {
  item: ImageType;
  onPress: (item: ImageType) => void;
  onRemove: (id: string) => void;
}
const ImageCard = (props: ImageCardProps) => {
  const {item, onRemove, onPress} = props;
  const remove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);
  const onImagePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);
  return (
    <ButtonComponent
      scaleAnimated={true}
      scaleInValue={0.9}
      activeOpacity={1}
      onPress={onImagePress}
      marginHorizontal={10}>
      <ImageComponent
        style={{
          aspectRatio: 0.8,
          height: AppInfor.width,
          borderRadius: 10,
        }}
        src={{uri: item.uri}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Box position={'absolute'} right={0} top={0} padding={5}>
        <ButtonComponent
          onPress={remove}
          padding={5}
          radius={20}
          backgroundColor={appColors.grays.gray500}>
          <CloseSvg size={16} />
        </ButtonComponent>
      </Box>
    </ButtonComponent>
  );
};

export default ImageCard;
