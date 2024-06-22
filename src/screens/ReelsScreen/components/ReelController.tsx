import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Container from '../../../components/Container.tsx';
import {Modal, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import {Reel} from '../../../models/Reel.ts';
import Box from '../../../components/Box.tsx';
import Spacer from '../../../components/Spacer.tsx';
import {likesFormat} from '../../../utils/Media.ts';
interface ReelControllerProps {
  onPause: () => void;
  onLikePress: () => void;
  onCommentPress: () => void;
  paused: boolean;
  item: Reel;
}
export interface ReelControllerHandle {
  isLike: boolean;
  toggleLike: () => void;
}
const ReelController = forwardRef<ReelControllerHandle, ReelControllerProps>(
  (props, ref) => {
    const {onPause, paused, onCommentPress, onLikePress, item} = props;
    const [isLike, setIsLike] = useState<boolean>(item.isLike);
    const [hiddenDescription, setHiddenDescription] = useState(false);
    useImperativeHandle(ref, () => ({
      isLike,
      toggleLike: () => {
        setIsLike(prevState => !prevState);
      },
    }));
    return (
      <SafeAreaView style={styles.containerController}>
        <Box flexDirection={'row'} flex={1} justifyContent={'flex-end'}>
          <ButtonComponent
            activeOpacity={1}
            onPress={() => {
              onPause();
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flex: 1,
            }}>
            {paused && (
              <ImageComponent
                alignSelf={'center'}
                src={require('../../../assets/icons/play.png')}
                height={40}
                width={40}
              />
            )}
          </ButtonComponent>
          <Box alignItems={'center'} justifyContent={'flex-end'} padding={15}>
            <ButtonComponent
              scaleInValue={0.7}
              scaleAnimated={true}
              activeOpacity={1}
              onPress={() => {
                onLikePress();
              }}>
              <ImageComponent
                width={30}
                height={30}
                src={require('../../../assets/icons/heart_button.png')}
                tintColor={isLike ? appColors.red : appColors.white}
              />
            </ButtonComponent>
            <TextComponent value={likesFormat(item.like)} />
            <Spacer height={15} />
            <ButtonComponent
              activeOpacity={1}
              scaleInValue={0.7}
              scaleAnimated={true}
              onPress={() => {}}>
              <ImageComponent
                width={30}
                height={30}
                src={require('../../../assets/icons/comment.png')}
                tintColor={appColors.white}
              />
            </ButtonComponent>
            <TextComponent value={likesFormat(item.comment.length)} />

            <Spacer height={15} />
            <ButtonComponent onPress={() => {}}>
              <ImageComponent
                width={30}
                height={30}
                src={require('../../../assets/icons/share.png')}
                tintColor={appColors.white}
              />
            </ButtonComponent>
          </Box>
        </Box>
        <Box padding={10} flexDirection={'row'}>
          <ButtonComponent
            name={'See more about account'}
            activeOpacity={1}
            scaleAnimated={true}
            scaleInValue={0.7}
            onPress={() => {}}>
            <ImageComponent
              src={{uri: item.avatar}}
              height={40}
              width={40}
              resizeMode={'cover'}
              borderRadius={99}
            />
          </ButtonComponent>
          <Box paddingHorizontal={15}>
            <TextComponent value={item.name} alignSelf={'flex-start'} />
            <Spacer height={5} />
            <ButtonComponent
              activeOpacity={1}
              onPress={() => setHiddenDescription(prevState => !prevState)}>
              <Text
                numberOfLines={hiddenDescription ? undefined : 2}
                style={{color: appColors.white, marginRight: 20}}>
                {item.description}
              </Text>
            </ButtonComponent>
          </Box>
        </Box>
      </SafeAreaView>
    );
  },
);
const styles = StyleSheet.create({
  containerController: {
    position: 'absolute',
    zIndex: 99,
    left: 0,
    bottom: 10,
    end: 0,
    top: 0,
  },
});
export default memo(ReelController);
