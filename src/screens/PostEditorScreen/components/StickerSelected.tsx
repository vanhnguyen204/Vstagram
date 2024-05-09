import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useRef} from 'react';
import ImageComponent from '../../../components/ImageComponent';
import {AppInfor} from '../../../constants/AppInfor';
import {appColors} from '../../../assets/colors/appColors';
interface StickerSelectedProps {
  item: string;
  index: number;
  showTrash: () => void;
  hideTrash: () => void;
  topEdgePosition: number;
  bottomEdgePosition: number;
  opacity?: number;
}

const StickerSelected = (props: StickerSelectedProps) => {
  const {
    item,
    index,
    showTrash,
    hideTrash,
    topEdgePosition,
    bottomEdgePosition,
    opacity = 1,
  } = props;
  const panSticker = useRef(new Animated.ValueXY()).current;
  const panResponderSticker = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (event, gestureState) => {
        panSticker.setValue({x: gestureState.dx, y: gestureState.dy});
        const currentX = panSticker.x._value;
        const currentY = panSticker.y._value;
        showTrash();
        if (currentY < AppInfor.height - bottomEdgePosition) {

        }
      },
      onPanResponderRelease: (event, gestureState) => {
        panSticker.extractOffset(); // reset value of useRef of panresponder
        hideTrash();
      },
    }),
  ).current;
  return (
    <Animated.View
      style={[
        {
          transform: [{translateX: panSticker.x}, {translateY: panSticker.y}],
        },
        styles.renderStickerStyle,
        {opacity: opacity},
      ]}
      {...panResponderSticker.panHandlers}>
      <TouchableOpacity>
        <ImageComponent
          key={index}
          src={{uri: item}}
          width={100}
          height={100}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  renderStickerStyle: {
    position: 'absolute',
    top: AppInfor.height / 3,
  },
});
export default memo(StickerSelected);
