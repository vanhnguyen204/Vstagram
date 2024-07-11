import React, {forwardRef, memo, ReactNode} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Box from './Box.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import TextComponent from './TextComponent.tsx';
interface InputComponentV2Props extends TextInputProps {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  textInputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const InputComponentV2 = forwardRef(
  (props: InputComponentV2Props, ref: React.LegacyRef<TextInput>) => {
    const {leadingIcon, trailingIcon, containerStyle, textInputStyle, ...rest} =
      props;
    return (
      <View style={[styles.containerInput, containerStyle]}>
        {leadingIcon && leadingIcon}
        <TextInput ref={ref} {...rest} style={[textInputStyle, styles.inputBase]} />
        {trailingIcon && trailingIcon}
      </View>
    );
  },
);
const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: appColors.grays.gray800,

  },
  inputBase: {
    flex: 1,
    color: appColors.white,
    padding: 5,
  },
});
export default memo(InputComponentV2);
