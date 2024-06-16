import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';

interface ModalLoadingProps {
  isShow: boolean;
  onClose?: () => void;
}
const ModalLoading = (props: ModalLoadingProps) => {
  const {isShow} = props;
  return (
    <Modal visible={isShow} transparent={true} animationType={'fade'}>
      <View style={[styles.containerModal]}>
        <ActivityIndicator size={'large'} color={appColors.white} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: appColors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: appColors.black,
  }
});
export default ModalLoading;
