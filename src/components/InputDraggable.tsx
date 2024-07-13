import React, {forwardRef, useState} from 'react';
import {StyleProp, TextInput, TextInputProps, TextStyle} from 'react-native';
import ViewDraggable from './ViewDraggable';

interface InputDraggableProps extends TextInputProps {
  textInputStyle?: StyleProp<TextStyle>;
  id: string;
}

const InputDraggable = forwardRef(
  (props: InputDraggableProps, ref: React.LegacyRef<TextInput>) => {
    const [value, setValue] = useState<string>('');
    const {textInputStyle, id, ...rest} = props;

    return (
      <ViewDraggable>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={textInputStyle}
          {...rest}
          ref={ref}
        />
      </ViewDraggable>
    );
  },
);

export default InputDraggable;
