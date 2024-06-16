import React from 'react';
import ButtonComponent from '../../../components/ButtonComponent';
import {appColors} from '../../../assets/colors/appColors';
import TextComponent from '../../../components/TextComponent';
import Box from '../../../components/Box';
import ImageComponent from '../../../components/ImageComponent';
import {StyleSheet} from 'react-native';
interface StoryBarEditorProps {
  onCloseStoryEditor: () => void;
  toggleInput: () => void;
  toggleShowListColor: () => void;
  toggleModalSticker: (isVisible: boolean) => void;
  toggleModalMusic: (isVisible: boolean) => void;
  onCapture: () => void;
  opacity?: number;
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
  } = props;
  return (
    <Box
      opacity={opacity}
      position="absolute"
      top={10}
      right={0}
      left={0}
      padding={2}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      {/* Close story editor */}
      <ButtonComponent
        style={styles.btnEditor}
        backgroundColor={appColors.black900}
        padding={3}
        alignSelf={'center'}
        marginHorizontal={5}
        name={'Close'}
        onPress={() => {
          onCloseStoryEditor();
        }}>
        <ImageComponent
          resizeMode={'contain'}
          tintColor={appColors.white}
          src={require('../../../assets/icons/close.png')}
          width={30}
          height={30}
        />
      </ButtonComponent>

      <Box flexDirection={'row'}>
        {/*Button show textinput */}
        <ButtonComponent
          style={styles.btnEditor}
          backgroundColor={appColors.black900}
          padding={6}
          alignSelf={'center'}
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
          backgroundColor={appColors.black900}
          padding={6}
          alignSelf={'center'}
          marginHorizontal={10}
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
        {/* Button show list music */}
        <ButtonComponent
          style={styles.btnEditor}
          backgroundColor={appColors.black900}
          padding={6}
          alignSelf={'center'}
          name={'Music'}
          onPress={() => {
            toggleModalMusic(true);
          }}>
          <ImageComponent
            tintColor={appColors.white}
            src={require('../../../assets/icons/musical-note.png')}
            width={25}
            height={25}
          />
        </ButtonComponent>
        {/* Button complete story editor */}
        <ButtonComponent
          flexDirection={'row'}
          radius={20}
          padding={7}
          backgroundColor={appColors.black900}
          marginHorizontal={10}
          alignSelf={'center'}
          name={'Continue'}
          onPress={() => {
            onCapture();
          }}>
          <TextComponent value="Tiếp" />
          <ImageComponent
            marginLeft={5}
            tintColor={appColors.secondary}
            width={20}
            height={20}
            src={require('../../../assets/icons/right-arrow.png')}
          />
        </ButtonComponent>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnEditor: {
    borderRadius: 50,
  },
});
export default StoryBarEditor;
