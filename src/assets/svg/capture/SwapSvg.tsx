import React from "react";
import { appColors } from "../../colors/appColors.ts";
import { Path, Svg } from "react-native-svg";

const SwapSvg = ({size = 24, color = appColors.white}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4 7H17L13.5 10.5L15 12L21 6L15 0L13.5 1.5L17 5H4V7Z"
        fill={color}
      />
      <Path
        d="M20 17H7L10.5 13.5L9 12L3 18L9 24L10.5 22.5L7 19H20V17Z"
        fill={color}
      />
    </Svg>
  );
};

export default SwapSvg;
