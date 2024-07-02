import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
import Box from './Box.tsx';

interface ModalLoadingProps {
  visible: boolean;
  onClose?: () => void;
}
const ModalLoading = (props: ModalLoadingProps) => {
  const {visible} = props;
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <View style={[styles.containerModal]}>
        <Box flexDirection={'row'}>
          <AnimatedScaleView duration={800} backgroundColor={appColors.red} />
          <AnimatedScaleView duration={500} />
          <AnimatedScaleView
            duration={1000}
            backgroundColor={appColors.blue500}
          />
        </Box>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: appColors.darkBlur,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: appColors.black,
  },
});

interface AnimatedScaleViewProps {
  scaleMin?: number;
  scaleMax?: number;
  duration?: number;
  backgroundColor?: string;
}

const AnimatedScaleView = ({
  scaleMin = 0.5,
  scaleMax = 1,
  duration = 1000,
  backgroundColor = appColors.white,
}: AnimatedScaleViewProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: scaleMax,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: scaleMin,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [scaleAnim, scaleMin, scaleMax, duration]);

  return (
    <Animated.View
      style={[
        {
          transform: [{scale: scaleAnim}],
          padding: 10,
          margin: 5,
          backgroundColor,
          borderRadius: 20,
        },
      ]}
    />
  );
};

export default ModalLoading;
