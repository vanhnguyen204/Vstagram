import React, {Component, RefObject} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {appColors} from '../assets/colors/appColors';
import ButtonComponent from './ButtonComponent.tsx';
import Box from './Box.tsx';
import { AppInfor } from "../constants/AppInfor.ts";

type Props<T> = {
  data: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  visible: boolean;
  onClose: () => void;
  containerStyle?: ViewStyle;
  buttonCloseColor?: string;
  onEndReached: (distance: number) => void;
};

type State = {
  scrollOffset: null | number;
  visible: boolean;
};

class ModalScrollable<T> extends Component<Props<T>, State> {
  public scrollViewRef: RefObject<FlatList<T>>;

  constructor(props: Props<T>) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      scrollOffset: null,
      visible: this.props.visible,
    };
  }

  handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = (p: {x: number; y: number; animated?: boolean}) => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollToOffset({
        offset: p.y,
        animated: p.animated,
      });
    }
  };

  render(): React.ReactElement<any> {
    const {
      data,
      renderItem,
      keyExtractor,
      onClose,
      visible,
      containerStyle,
      buttonCloseColor,
      onEndReached,
    } = this.props;
    return (
      <Modal
        testID={'modal'}
        isVisible={visible}
        onSwipeComplete={onClose}
        swipeDirection={['down']}
        scrollTo={(params: {x: number; y: number; animated?: boolean}) =>
          this.handleScrollTo(params)
        }
        scrollOffset={this.state.scrollOffset ?? 0}
        scrollOffsetMax={100}
        propagateSwipe={true}
        style={styles.modal}>
        <View style={[styles.scrollableModal, containerStyle]}>
          <SafeAreaView>
            <Box alignItems={'center'} justifyContent={'center'}>
              <View style={styles.modalIndicatorTop} />
              <ButtonComponent
                style={styles.buttonCancel}
                nameColor={buttonCloseColor}
                name={'Huỷ'}
                onPress={onClose}
                alignSelf={'flex-end'}
              />
            </Box>
            <FlatList
              onEndReachedThreshold={0.5}
              onEndReached={({distanceFromEnd}) => {
                onEndReached(distanceFromEnd);
              }}
              ref={this.scrollViewRef}
              onScroll={this.handleOnScroll}
              scrollEventThrottle={16}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: AppInfor.height / 2,
    backgroundColor: appColors.gray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
  },
  modalIndicatorTop: {
    height: 5,
    width: 40,
    backgroundColor: appColors.grays.gray700,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonCancel: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  button: {
    marginTop: 20,
  },
});

export default ModalScrollable;
