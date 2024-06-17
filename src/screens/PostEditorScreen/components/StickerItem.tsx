import React, {memo} from 'react';
import {ImageSourcePropType, View} from 'react-native';
import ImageComponent from '../../../components/ImageComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {useStoryStore} from '../../../hooks/useStoryEditor.ts';

interface StickerProps {
  url: string;
  index?: number;
}
const StickerItem = (props: StickerProps) => {
  const {setStickers, stickers, toggleModalSticker} = useStoryStore();
  const {url, index} = props;
  const handleSelected = () => {
    setStickers(url);
  };
  return (
    <ButtonComponent
      onPress={() => {
        handleSelected();
        toggleModalSticker(false);
      }}
      name={'click'}
      style={{
        flexBasis: '30%',
        alignItems: 'center',
      }}>
      <ImageComponent
        resizeMode={'contain'}
        src={{uri: url}}
        width={100}
        height={100}
      />
    </ButtonComponent>
  );
};

export default memo(StickerItem);
