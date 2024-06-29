import React from 'react';
import {DimensionValue, View} from 'react-native';
interface SpacerProps {
  width?: number;
  height?: number;
  flex?: number;
  background?: string;
}
const Spacer = (props: SpacerProps) => {
  const {width = 0, background, flex = 0, height = 0} = props;
  return <View style={{width, height, flex, backgroundColor: background}} />;
};

export default Spacer;
