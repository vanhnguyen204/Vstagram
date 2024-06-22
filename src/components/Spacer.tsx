import React from 'react';
import {DimensionValue, View} from 'react-native';
interface SpacerProps {
  width?: number;
  height?: number;
  flex?: number;
}
const Spacer = (props: SpacerProps) => {
  const {width = 0, flex = 0, height = 0} = props;
  return <View style={{width, height, flex}} />;
};

export default Spacer;
