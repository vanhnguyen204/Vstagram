import React, {memo} from 'react';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../assets/colors/appColors';
import TextComponent from '../../../components/TextComponent';
import Box from '../../../components/Box';
import ImageComponent from '../../../components/ImageComponent';
import {StyleSheet, Text} from 'react-native';

import {Music} from '../../../models';
import Spacer from '../../../components/Spacer';
import ButtonWithPopup from '../../SearchScreen/LongPressButton';
interface StoryBarEditorProps {
  onCloseStoryEditor: () => void;
  toggleInput: () => void;
  toggleShowListColor: () => void;
  toggleModalSticker: (isVisible: boolean) => void;
  toggleModalMusic: () => void;
  onCapture: () => void;
  opacity?: number;
  musicSelected: Music;
  removeMusic: () => void;
}

const StoryBarEditor = (props: StoryBarEditorProps) => {
  const {
    onCloseStoryEditor,
    toggleInput,
    toggleShowListColor,
    toggleModalSticker,
    toggleModalMusic,
    onCapture,
    opacity = 1,
    musicSelected,
    removeMusic,
  } = props;
  return (
    <Box
      opacity={opacity}
      position="absolute"
      top={10}
      right={0}
      left={0}
      paddingHorizontal={10}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      {/* Close story editor */}
      <ButtonComponent
        style={styles.btnEditor}
        name={'Close'}
        onPress={() => {
          onCloseStoryEditor();
        }}>
        <ImageComponent
          resizeMode={'contain'}
          tintColor={appColors.white}
          src={require('../../../assets/icons/close.png')}
          width={25}
          height={25}
        />
      </ButtonComponent>

      <Box flexDirection={'row'}>
        {musicSelected.image ? (
          <ButtonWithPopup
            popupStyle={styles.popupStyle}
            popupContent={
              <ButtonComponent onPress={removeMusic}>
                <ImageComponent
                  width={20}
                  height={20}
                  src={require('../../../assets/icons/trash-bin.png')}
                />
              </ButtonComponent>
            }
            buttonContent={
              <ButtonComponent
                activeOpacity={1}
                scaleAnimated
                scaleInValue={0.9}
                onPress={toggleModalMusic}
                flexDirection="row"
                padding={5}
                backgroundColor={appColors.black900}
                radius={5}>
                <ImageComponent
                  resizeMode="cover"
                  borderRadius={99}
                  src={{uri: musicSelected.image}}
                  width={25}
                  height={25}
                />
                <Spacer width={10} />
                <Box>
                  <Text numberOfLines={1} style={styles.musicText}>
                    {musicSelected.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.musicText}>
                    {musicSelected.artist}
                  </Text>
                </Box>
              </ButtonComponent>
            }
          />
        ) : (
          <ButtonComponent
            style={styles.btnEditor}
            name={'Music'}
            onPress={toggleModalMusic}>
            <ImageComponent
              tintColor={appColors.white}
              src={require('../../../assets/icons/musical-note.png')}
              width={25}
              height={25}
            />
          </ButtonComponent>
        )}

        {/*Button show text input */}
        <ButtonComponent
          style={styles.btnEditor}
          name={'Show Input'}
          onPress={() => {
            toggleInput();
            toggleShowListColor();
          }}>
          <TextComponent value={'Aa'} fontSize={20} />
        </ButtonComponent>
        {/* Button show modal sticker */}
        <ButtonComponent
          style={styles.btnEditor}
          name={'Select sticker'}
          onPress={() => {
            toggleModalSticker(true);
          }}>
          <ImageComponent
            tintColor={appColors.white}
            src={require('../../../assets/icons/sticker.png')}
            width={25}
            height={25}
          />
        </ButtonComponent>
        <ButtonComponent
          style={styles.btnEditor}
          name={'Continue'}
          onPress={() => {
            onCapture();
          }}>
          <ImageComponent
            alignSelf={'center'}
            tintColor={appColors.secondary}
            width={25}
            height={25}
            src={require('../../../assets/icons/right-arrow.png')}
          />
        </ButtonComponent>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnEditor: {
    borderRadius: 99,
    alignSelf: 'center',
    backgroundColor: appColors.black900,
    padding: 10,
    marginHorizontal: 3,
  },
  popupStyle: {
    marginTop: 5,
  },
  musicText: {
    maxWidth: 70,
    color: appColors.white,
    fontSize: 12,
  },
});
export default memo(StoryBarEditor);
