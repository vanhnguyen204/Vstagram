import React, {useRef, useState} from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from 'react-native-modal';
import ModalBaseScene from '../utils/ModalBaseScene.tsx';
import App from "../../App.tsx";
import { AppInfor } from "../constants/AppInfor.ts";
import app from "../../App.tsx";
import { appColors } from "../assets/colors/appColors.ts";

interface ScrollableModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  data?: any;
}

const ScrollableModal = (props: ScrollableModalProps) => {
  const {children, isVisible, onClose, data} = props;
  const [scrollOffset, setScrollOffset] = useState<number | undefined>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: {x?: number; y: number}) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}>
      <View style={styles.scrollableModal}>

        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
         <View>
           {children}
         </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollableModal: {

    height: AppInfor.height / 2,
    backgroundColor: appColors.gray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ScrollableModal;
