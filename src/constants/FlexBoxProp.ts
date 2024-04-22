import {ViewStyle} from 'react-native';

export interface FlexBoxProp {
  flex?: number;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  backgroundColor?: string;
  opacity?: number;
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  reverse?: boolean;
  row?: boolean;
  center?: boolean;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  height?: number | string;
  width?: number | string;
  size?: number;
  maxHeight?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  radius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
  borderWidth?: number;
  borderColor?: string;
  style?: ViewStyle;
}
