import React, {ReactNode, useRef} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import {AppInfor} from '../constants/AppInfor.ts';

interface ModalBottomSheetProps {
  children: ReactNode;
  isVisible: boolean;
  toggle: () => void;
  transparent?: boolean;
}

const ModalBottomSheet = (props: ModalBottomSheetProps) => {
  const {children, isVisible, transparent, toggle} = props;
  const panModal = useRef(new Animated.ValueXY()).current;
  const screenHeight = Dimensions.get('window').height;

  const panResponderModal = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dy: panModal.y}], // Animated.event does not work with extractOffset
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (event, gestureState) => {
        panModal.flattenOffset(); // reset value of useRef of panresponder
      },
    }),
  ).current;

  // Calculate height of modal based on gestureState
  const modalHeight = panModal.y.interpolate({
    inputRange: [0, screenHeight / 2], // Change range as needed
    outputRange: [screenHeight / 2, 0],
    extrapolate: 'clamp', // Ensure output is within outputRange
  });

  return (
    <Modal
      animationType={'slide'}
      visible={isVisible}
      transparent={transparent ?? false}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <TouchableWithoutFeedback onPress={toggle} style={{flex: 1}}>
          <View style={{flex: 1, marginBottom: 10}} />
        </TouchableWithoutFeedback>
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <Animated.View
            {...panResponderModal.panHandlers}
            style={[
              {
                transform: [{translateY: panModal.y}],
                backgroundColor: 'green',
                height: modalHeight,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 10,
              },
            ]}>
            {children}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalBottomSheet;
