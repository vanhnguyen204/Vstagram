import {SafeAreaView, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode, memo} from 'react';
import {globalStyle} from '../styles/globalStyle';
import {appColors} from '../assets/colors/appColors';
import {FlexBoxProp} from '../constants/FlexBoxProp';
interface ContainerProps extends FlexBoxProp {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}
const Container = (props: ContainerProps) => {
  const {
    children,
    containerStyle,
    backgroundColor,
    flexDirection,
    alignItems,
    justifyContent,
    padding = 0,
  } = props;
  return (
    <SafeAreaView
      style={[
        containerStyle || globalStyle.containerStyle,
        {
          backgroundColor: backgroundColor || appColors.backgroundApp,
          flexDirection: flexDirection ?? 'column',
          alignItems: alignItems ?? undefined,
          justifyContent: justifyContent ?? undefined,
          padding,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
};

export default memo(Container);
