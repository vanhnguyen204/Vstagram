import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {appColors} from '../assets/colors/appColors.ts';

type State<P> = P & {
  visible: boolean;
};

abstract class ModalBaseScene<P extends object = {}> extends Component<
  any,
  State<P>
> {
  abstract renderModal(): React.ReactElement<any>;

  protected constructor(props: any, state?: P) {
    super(props);
    // @ts-ignore
    this.state = {
      ...state,
      visible: false,
    };
  }

  open = () => this.setState({visible: true} as any);
  close = () => this.setState({visible: false} as any);
  isVisible = () => this.state.visible;
  public renderButton(): React.ReactElement<any> {
    return (
      <Button testID={'modal-open-button'} onPress={this.open} title="Open" />
    );
  }
  render() {
    return (
      <View style={styles.view}>
        {this.renderButton()}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.gray,
  },
});

export default ModalBaseScene;
