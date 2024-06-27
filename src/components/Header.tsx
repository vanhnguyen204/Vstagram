import React, {memo, ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import TextComponent from './TextComponent.tsx';

interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  componentLeft?: ReactNode;
  componentCenter?: ReactNode;
  componentRight?: ReactNode;
}
const Header = (props: HeaderProps) => {
  const {style, componentRight, componentCenter, componentLeft} = props;
  return (
    <View style={style}>
      {componentLeft || <TextComponent value={''} />}
      {componentCenter || <TextComponent value={''} />}
      {componentRight || <TextComponent value={''} />}
    </View>
  );
};

export default memo(Header);
