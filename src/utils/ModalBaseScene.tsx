import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface ModalBaseSceneProps {
  children: React.ReactNode;
  buttonTitle?: string;
}

const ModalBaseScene: React.FC<ModalBaseSceneProps> = ({ children, buttonTitle = 'Open' }) => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const isVisible = () => visible;

  return (
    <View style={styles.view}>
      <Button testID={'modal-open-button'} onPress={open} title={buttonTitle} />
      {visible && children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalBaseScene;
