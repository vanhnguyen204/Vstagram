import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { appColors } from "../../colors/appColors.ts";

const CloseSvg = ({ size = 24, color = appColors.white }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseSvg;
