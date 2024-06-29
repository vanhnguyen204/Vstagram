import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import {appColors} from '../../colors/appColors.ts';

const SquareSvg = ({size = 24, color = appColors.white, borderRadius = 0}) => (
  <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
    <Rect
      x={0}
      y={0}
      width={size}
      height={size}
      rx={borderRadius}
      ry={borderRadius}
      fill={color}
    />
  </Svg>
);

export default SquareSvg;
