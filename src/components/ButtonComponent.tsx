import {TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {FlexBoxProp} from '../constants/FlexBoxProp';
import TextComponent from './TextComponent';
import {appColors} from '../assets/colors/appColors';

interface ButtonComponentProps extends FlexBoxProp {
  name?: string;
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  nameColor?: string;
  children?: ReactNode | undefined;
  fontSize?: number;
  disabled?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  activeOpacity?: number;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    name,
    onPress,
    disabled,
    style,
    backgroundColor,
    nameColor,
    radius,
    padding,
    alignItems,
    alignSelf,
    children,
    marginHorizontal,
    flexDirection,
    justifyContent,
    marginVertical,
    borderColor,
    borderWidth,
    fontSize,
    overflow,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingHorizontal,
    paddingBottom,
    paddingTop,
    paddingVertical,
    paddingLeft,
    paddingRight,
    onPressIn,
    onPressOut,
    onLongPress,
    activeOpacity,
  } = props;

  const buttonStyle: ViewStyle = {
    backgroundColor: backgroundColor || appColors.transparent,
    borderRadius: radius,
    padding,
    alignItems: alignItems || 'center',
    alignSelf: alignSelf || 'stretch',
    flexDirection: flexDirection || 'column',
    justifyContent: justifyContent || 'center',
    borderColor: borderColor || appColors.white,
    borderWidth,
    overflow,
    margin,
    marginHorizontal: marginHorizontal ?? 0,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingHorizontal,
    paddingBottom,
    paddingTop,
    paddingVertical,
    paddingLeft,
    paddingRight,
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      onPress={onPress}
      style={[buttonStyle, style]}>
      {children ? (
        children
      ) : name ? (
        <TextComponent
          color={nameColor}
          fontSize={fontSize}
          value={name ?? ''}
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default memo(ButtonComponent);
