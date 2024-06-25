import React, { memo, useState } from "react";
import InputComponent from './InputComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import Box from './Box.tsx';
import ButtonComponent from './ButtonComponent.tsx';
import ImageComponent from './ImageComponent.tsx';
import TextComponent from './TextComponent.tsx';

interface InputChatMessageProps {

  onConfirm: (text: string) => void
}
const InputChatMessage = (props: InputChatMessageProps) => {
  const { onConfirm} = props;
  const icons: string[] = ['😁', '😆', '😭', '😡', '🫡', '💩', '😍'];
  const [value, setValue] = useState<string>('');
  return (
    <Box
      paddingHorizontal={10}
      paddingVertical={10}
      // position={'relative'}
      // // bottom={keyboardHeight !== 0 ? keyboardHeight - 90 : keyboardHeight}
      // left={0}
      // right={0}
    >
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        marginBottom={5}>
        {icons.map((item, index) => (
          <ButtonComponent
            key={index}
            name={'Select icon'}
            onPress={() => {
            setValue(prevState => prevState.concat(item))
            }}>
            <TextComponent value={item} fontSize={24} />
          </ButtonComponent>
        ))}
      </Box>
      <Box
        flexDirection={'row'}
        paddingHorizontal={5}
        paddingVertical={8}
        borderWidth={1}
        alignItems={'center'}
        borderColor={appColors.grays.gray500}
        radius={15}>
        <InputComponent
          multiline={true}
          placeholderTextColor={appColors.grays.gray500}
          placeholder={'Viết bình luận'}
          flex={1}
          textColor={appColors.black900}
          value={value}
          onChangeText={setValue}
        />
        {value && (
          <ButtonComponent
            style={{position: 'relative', right: 0, bottom: 0}}
            onPress={() => onConfirm(value)}
            name={'Send comment'}>
            <ImageComponent
              src={require('../assets/icons/send.png')}
              height={20}
              width={20}
            />
          </ButtonComponent>
        )}
      </Box>
    </Box>
  );
};

export default memo(InputChatMessage);
