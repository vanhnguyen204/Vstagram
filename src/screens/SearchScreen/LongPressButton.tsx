import React, {
  useState,
  useRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  StyleSheet,
  Vibration,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
interface ButtonComponentV2 extends TouchableOpacityProps {
  buttonContent: React.ReactNode;
  popupContent?: ReactNode;
  popupStyle?: StyleProp<ViewStyle>;
}
const ButtonWithPopup = forwardRef(
  (props: ButtonComponentV2, ref: React.ForwardedRef<any>) => {
    const {buttonContent, popupStyle, popupContent} = props;

    const viewRef = useRef<View>(null);
    const [modalInfor, setModalInfor] = useState({
      visible: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
    const handleLongPress = (event: any) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        viewRef.current?.measure((fx, fy, width, height, px, py) => {
          setModalInfor({
            x: px,
            y: py,
            width,
            height,
            visible: true,
          });
          Vibration.vibrate(100);
        });
      }
    };
    useImperativeHandle(ref, () => ({
      closeModal: () => {
        setModalInfor(prevState => ({...prevState, visible: false}));
      },
    }));
    return (
      <View style={styles.container}>
        <LongPressGestureHandler
          onHandlerStateChange={handleLongPress}
          minDurationMs={300} // thời gian nhấn giữ
        >
          <View ref={viewRef}>{buttonContent}</View>
        </LongPressGestureHandler>

        <Modal
          backdropOpacity={0}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          isVisible={modalInfor.visible}
          onBackdropPress={() =>
            setModalInfor(prevState => ({...prevState, visible: false}))
          }
          style={[
            styles.modalContainer,

            {
              top: modalInfor.y + modalInfor.height,
              left: modalInfor.x, // điều chỉnh vị trí bên cạnh trái button
              // height: modalPosition.height,
            },
          ]}>
          <View style={[styles.popup, popupStyle]}>
            {popupContent ? (
              popupContent
            ) : (
              <TextComponent
                value={'This is popup'}
                color={appColors.black900}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  transparentArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  popup: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
});

export default ButtonWithPopup;
