import React, {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Box from '../../../components/Box.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import SliderComponent from '../../../components/SliderComponent.tsx';
import ListColor from './ListColor.tsx';
import ListFont from './ListFont.tsx';
import fonts from '../../../assets/fonts';
import {TextElement, useStoryEditor} from '../../../hooks';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import InputComponent from '../../../components/InputComponent.tsx';
import {InputEditorTypeCreate, InputEditorTypeEdit} from '../index.tsx';
interface TextEditorLayerProps {
  onDone: (textElement: TextElement) => void;
  type: InputEditorTypeCreate | InputEditorTypeEdit;
  onCloseEditor: () => void;
  onRemove: (id: string) => void;
}
type TextEditorContextType = {
  textElement: TextElement;
  setTextElement: (textElement: TextElement) => void;
};
export const TextEditorContext = createContext<TextEditorContextType>({
  textElement: {
    value: '',
    id: '',
    color: '',
    font: '',
    size: 18,
  },
  setTextElement: () => {},
});
const TextEditorLayer = forwardRef(
  (props: TextEditorLayerProps, ref: React.ForwardedRef<any>) => {
    const {onDone, type, onCloseEditor, onRemove} = props;
    const {texts} = useStoryEditor();
    const [showListColorOrFont, setShowListColorOrFont] =
      useState<boolean>(false);
    const [textElement, setTextElement] = useState<TextElement>({
      value: '',
      id: '',
      color: '',
      font: '',
      size: 18,
    });

    const showListColor = useCallback(() => {
      setShowListColorOrFont(false);
    }, []);
    const showListFont = useCallback(() => {
      setShowListColorOrFont(true);
    }, []);
    const handleChangeSize = useCallback((value: number) => {
      setTextElement(prevState => ({...prevState, size: value}));
    }, []);
    const onChangeText = useCallback((value: string) => {
      setTextElement(prevState => ({...prevState, value: value}));
    }, []);
    const handleDone = useCallback(() => {
      const text: TextElement = {
        ...textElement,
        id:
          type.type === 'CREATE'
            ? (texts.length + 1).toString()
            : textElement.id,
      };
      onDone(text);
    }, [onDone, textElement, texts.length, type.type]);

    useEffect(() => {
      if (type.type === 'EDIT') {
        setTextElement(type.element);
      }
    }, [type]);
    useEffect(() => {
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => {
          onCloseEditor();
          console.log('run');
        },
      );

      return () => {
        keyboardDidHideListener.remove();
      };
    }, [onCloseEditor]);
    const handleRemoveText = useCallback(() => {
      if (type.type === 'EDIT') {
        onRemove(type.element.id);
      }
    }, [onRemove, type]);

    return (
      <TextEditorContext.Provider value={{textElement, setTextElement}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={70}
          style={[styles.containerKeyboard]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerContent}>
              <Box
                flexDirection={'row'}
                padding={10}
                alignItems={'center'}
                justifyContent={'space-between'}>
                <ButtonComponent
                  disabled={type.type === 'CREATE'}
                  name="Delete text"
                  fontSize={18}
                  onPress={handleRemoveText}>
                  <ImageComponent
                    tintColor={
                      type.type === 'CREATE'
                        ? appColors.transparent
                        : appColors.white
                    }
                    src={require('../../../assets/icons/trash-bin.png')}
                    height={30}
                    width={30}
                  />
                </ButtonComponent>
                <Box flexDirection={'row'}>
                  <ButtonComponent
                    borderColor={appColors.white}
                    name={'Select font'}
                    onPress={showListFont}>
                    <ImageComponent
                      src={require('../../../assets/icons/typography.png')}
                      height={30}
                      width={30}
                    />
                  </ButtonComponent>

                  <ButtonComponent
                    padding={0}
                    radius={99}
                    marginHorizontal={5}
                    borderWidth={2}
                    borderColor={appColors.white}
                    name={'Select color'}
                    onPress={showListColor}>
                    <ImageComponent
                      src={require('../../../assets/icons/colour.png')}
                      height={30}
                      width={30}
                    />
                  </ButtonComponent>
                </Box>
                <ButtonComponent
                  name="Xong"
                  fontSize={18}
                  onPress={handleDone}
                />
              </Box>
              <Box alignSelf={'center'}>
                <InputComponent
                  multiline={true}
                  autoFocus={true}
                  placeholder={'Hãy viết gì đó'}
                  placeholderTextColor={appColors.white}
                  value={textElement.value}
                  style={{
                    fontSize: textElement.size,
                    fontFamily: textElement.font,
                    color:
                      textElement.color !== ''
                        ? textElement.color
                        : appColors.white,
                  }}
                  onChangeText={onChangeText}
                />
              </Box>

              <Box position={'absolute'} top={AppInfor.height / 4} left={-70}>
                <SliderComponent
                  value={textElement.size}
                  onValueChange={handleChangeSize}
                />
              </Box>

              <View>
                {!showListColorOrFont ? (
                  <ListColor colors={appColors.colorsStoryTextEditor} />
                ) : (
                  <ListFont fonts={fonts.fontsStory} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TextEditorContext.Provider>
    );
  },
);
const styles = StyleSheet.create({
  containerKeyboard: {
    backgroundColor: appColors.darkBlur,
    position: 'absolute',
    flex: 1,
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerTextStyle: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    alignSelf: 'center',
  },
});
export const useTextEditor = () => useContext(TextEditorContext);
export default memo(TextEditorLayer);
