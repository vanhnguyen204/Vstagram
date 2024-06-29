import React from 'react';
import {appColors} from '../../colors/appColors.ts';
import {Path, Svg} from 'react-native-svg';

const ShareSvg = ({size = 24, color = appColors.white}) => (
  <Svg viewBox="0 0 227.216 227.216" height={size} width={size}>
    <Path
      fill={color}
      d="M175.897 141.476c-13.249 0-25.11 6.044-32.98 15.518l-51.194-29.066a42.671 42.671 0 0 0 2.467-14.317 42.67 42.67 0 0 0-2.467-14.316l51.19-29.073c7.869 9.477 19.732 15.523 32.982 15.523 23.634 0 42.862-19.235 42.862-42.879C218.759 19.229 199.531 0 175.897 0 152.26 0 133.03 19.229 133.03 42.865c0 5.02.874 9.838 2.467 14.319L84.304 86.258c-7.869-9.472-19.729-15.514-32.975-15.514-23.64 0-42.873 19.229-42.873 42.866 0 23.636 19.233 42.865 42.873 42.865 13.246 0 25.105-6.042 32.974-15.513l51.194 29.067a42.67 42.67 0 0 0-2.468 14.321c0 23.636 19.23 42.865 42.867 42.865 23.634 0 42.862-19.23 42.862-42.865.001-23.64-19.227-42.874-42.861-42.874zm0-126.476c15.363 0 27.862 12.5 27.862 27.865 0 15.373-12.499 27.879-27.862 27.879-15.366 0-27.867-12.506-27.867-27.879C148.03 27.5 160.531 15 175.897 15zM51.33 141.476c-15.369 0-27.873-12.501-27.873-27.865 0-15.366 12.504-27.866 27.873-27.866 15.363 0 27.861 12.5 27.861 27.866 0 15.364-12.499 27.865-27.861 27.865zm124.567 70.74c-15.366 0-27.867-12.501-27.867-27.865 0-15.37 12.501-27.875 27.867-27.875 15.363 0 27.862 12.505 27.862 27.875 0 15.364-12.499 27.865-27.862 27.865z"
    />
  </Svg>
);

export default ShareSvg;
