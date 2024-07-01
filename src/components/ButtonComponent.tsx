import {Animated, TouchableOpacity, ViewStyle} from 'react-native';
import React, {memo, ReactNode, useRef} from 'react';
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
  scaleAnimated?: boolean;
  scaleInValue?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const {
    scaleAnimated = false,
    scaleInValue = 0.6,
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
    activeOpacity = 0.6,
    flex,
  } = props;

  const buttonStyle: ViewStyle = {
    flex: flex,
    backgroundColor: backgroundColor || appColors.transparent,
    borderRadius: radius,
    padding,
    alignItems: alignItems || undefined,
    alignSelf: alignSelf || undefined,
    flexDirection: flexDirection || undefined,
    justifyContent: justifyContent || undefined,
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
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onButtonPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: scaleInValue,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPressIn={() => {
        if (onPressIn) {
          onPressIn();
        }
        onButtonPressIn();
      }}
      onPressOut={() => {
        if (onPressOut) {
          onPressOut();
        }
        onButtonPressOut();
      }}
      onLongPress={onLongPress}
      disabled={disabled}
      onPress={onPress}>
      <Animated.View
        style={[
          buttonStyle,
          style,
          scaleAnimated && {transform: [{scale: scaleValue}]},
        ]}>
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
      </Animated.View>
    </TouchableOpacity>
  );
};

export default memo(ButtonComponent);
